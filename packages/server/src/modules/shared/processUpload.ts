import shortid from 'shortid'
import { createWriteStream } from 'fs'
import { UploadType } from '../user/types/UploadType'

const storeUpload = async (stream: any, mimetype: string): Promise<any> => {
  const extension = mimetype.split('/')[1]
  const id = `${shortid.generate()}.${extension}`
  const path = `images/${id}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path, { autoClose: true }))
      .on('finish', () => resolve({ id }))
      .on('error', reject)
  )
}

export const processUpload = async (upload: UploadType) => {
  const { createReadStream, mimetype } = await upload
  const stream = createReadStream()
  const { id } = await storeUpload(stream, mimetype)
  return id
}
