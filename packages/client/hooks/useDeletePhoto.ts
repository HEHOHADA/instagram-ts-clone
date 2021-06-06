import { useDeletePhotoMutation } from '@/geterated'
import { useCallback } from 'react'
import { Getters } from '@/hoc'

export type  DeletePhotoGetters = Getters<ReturnType<typeof useDeletePhoto>>

export const useDeletePhoto = () => {
  const [deletePhotoMutation] = useDeletePhotoMutation()
  const deletePhoto = useCallback(async (id: string) => {
    await deletePhotoMutation({
      variables: { id },
      update: (cache) => {
        cache.evict({ id: cache.identify({ __ref: `Photo:${ id }` }) })
      }
    })
  }, [deletePhotoMutation])

  return { deletePhoto }
}
