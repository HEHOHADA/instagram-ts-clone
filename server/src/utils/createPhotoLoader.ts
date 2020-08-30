import DataLoader from 'dataloader'
import { Photo } from '../entity/Photo'

export const createPhotoLoader = () => new DataLoader<string, Photo>(async photoIds => {
  const photos = await Photo.findByIds(photoIds as string[])

  const photoIdsToPhoto: Record<string, Photo> = {}

  photos.forEach(photo => {
    photoIdsToPhoto[photo.id] = photo
  })


  return photoIds.map(uId => photoIdsToPhoto[uId])
})
