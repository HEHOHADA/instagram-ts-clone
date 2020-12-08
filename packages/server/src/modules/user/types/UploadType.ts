import { Stream } from 'stream'

export interface UploadType {
  createReadStream: () => Stream
  filename: string
  mimetype: string
  encoding: string
}
