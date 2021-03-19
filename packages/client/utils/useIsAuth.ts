import { useMeQuery } from '@instagram/common'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useIsAuth = () => {
  const { data, loading } = useMeQuery()
  const router = useRouter()
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/accounts/login')
    }
  }, [data, loading, router])
}
