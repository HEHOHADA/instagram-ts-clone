import React from 'react'
import MainLayout from '../../components/MainLayout'
import withApollo from '../../lib/withApollo'
import { useViewPhotoByIdQuery } from '../../geterated/apollo'
import { useRouter } from 'next/router'

const PhotoViewPost = () => {
  const router = useRouter()
  const url = typeof router.query.photoId === 'string' ? router.query.photoId : -1
  const {data} = useViewPhotoByIdQuery({
    skip: url === -1,
    variables: {
      id: url as string
    }
  })

  console.log(data)
  return (
      <MainLayout title={ 'Photo by ...' }>

      </MainLayout>
  )
}

export default withApollo({ssr: true})(PhotoViewPost)
