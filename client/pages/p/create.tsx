import React from 'react'
import MainLayout from '../../components/MainLayout'
import { DropzoneField } from '../../components/utils/DropzoneField'
import { CreatePhotoMutationVariables, useCreatePhotoMutation } from '../../geterated/apollo'
import { Field, Form, Formik } from 'formik'
import { InputAuthField } from '../../components/utils/InputAuthField'
import { useRouter } from 'next/router'
import { formatValidationErrors } from '../../utils/formatValidationErrors'
import withApollo from '../../lib/withApollo'
import { useIsAuth } from '../../utils/useIsAuth'

const Create = () => {
  useIsAuth()
  const [createPhoto] = useCreatePhotoMutation()
  const router = useRouter()

  const createPhotoHandler = async (data: any, {setErrors}: any) => {
    try {
      const response = await createPhoto({
        variables: {
          ...data
        }, update: (cache) => {

          cache.evict({fieldName: 'feed:{}'})
          // const oldCache: any = cache.readQuery({query: FeedDocument})
          // if (oldCache) {
          //   const newArray = [...oldCache.feed]
          //   newArray.unshift(data!.createPhoto)
          //   cache.writeQuery<FeedQuery>({
          //     query: FeedDocument,
          //     data: {feed: {photos: newArray, ...oldCache.feed.feedInfo}}
          //   })
          // } else {
          //   cache.writeQuery<FeedQuery>({query: FeedDocument,
          //     data: {
          //       feed: {
          //         feedInfo: {endCursor: data?.createPhoto.date, hasMore: false},
          //         photos: [data!.createPhoto as any]
          //       }
          //     }
          //   })
          // }
        }
      })
      if (response) {
        await router.push('/')
      }
    } catch (e) {
      setErrors(formatValidationErrors(e.graphQLErrors[0], 'title'))
    }
  }

  return (
      <MainLayout title={ 'Photo create' }>
        <div className="photo__create__container">
          <div className="photo__create__form__container">
            <Formik<CreatePhotoMutationVariables>
                validateOnBlur={ false }
                validateOnChange={ false }
                initialValues={ {title: '', picture: null} }
                onSubmit={ createPhotoHandler }
            >{ () => (
                <Form  className="photo__create__form">
                  <Field
                      type="text"
                      name="title"
                      placeholder="Title"
                      className="photo__create__title"
                      component={ InputAuthField }/>
                  <div className="photo__create__image-upload">
                    <Field
                        text={ 'Добавить фото' }
                        className="photo__create__image-upload__text"
                        name="picture"
                        type="file"
                        component={ DropzoneField }/>
                  </div>
                  <div className="photo__create__btn__container">
                    <button type="submit" className="photo__create__btn">
                      Create Photo
                    </button>
                  </div>
                </Form>
            ) }
            </Formik>
          </div>
        </div>
      </MainLayout>
  )
}

export default withApollo()(Create)
