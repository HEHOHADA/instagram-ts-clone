import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { MeDocument, MeQuery, useLoginMutation } from '@instagram/common'

import { setAccessToken } from '@/lib/token'
import { formatValidationErrors } from '@/utils/formatValidationErrors'

export default function useLogin() {
  const [login, {loading}] = useLoginMutation()
  const router = useRouter()
  const submitLoginHandler = useCallback(async (data, {setErrors}) => {
    try {
      const response = await login({
        variables: {
          data
        }, update: (cache, {data}) => {
          if (!data || !data.login) {
            return
          }

          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user
            }
          })
        }

      })
      if (response && response.data) {
        setAccessToken(response.data.login.accessToken)
      }

      router.push('/')

    } catch (e) {
      setErrors(formatValidationErrors(e.graphQLErrors[0], 'email'))
    }
  }, [])

  return {
    loading, submitLoginHandler
  }
}
