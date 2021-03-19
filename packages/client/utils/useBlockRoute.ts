import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMeQuery } from '@instagram/common'

export const useBlockRoute = () => {
  const { data, loading } = useMeQuery()
  const router = useRouter()
  useEffect(() => {
    if (!loading && data?.me) {
      router.replace('/')
    }
  }, [data, loading, router])
}
