import React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { getCookieParser } from 'next/dist/next-server/server/api-utils'

import withApollo from '@/lib/withApollo'
import {MainLayout }from '@/components/layouts/MainLayout'
import { DropzoneField } from '@/components/utils/DropzoneField'
import { InputAuthField } from '@/components/utils/InputAuthField'
import { formatValidationErrors } from '@/utils/formatValidationErrors'
import Redirect from '@/lib/redirect'
import { ICreatePhotoMutationVariables, useCreatePhotoMutation } from '@/geterated'

const Create = () => {
  const router = useRouter()
  const [createPhoto, { loading }] = useCreatePhotoMutation()

  const createPhotoHandler = async (data: ICreatePhotoMutationVariables, { setErrors }: FormikHelpers<ICreatePhotoMutationVariables>) => {
    try {
      const response = await createPhoto({
        variables: {
          ...data
        }, update: (cache) => {
          cache.evict({ fieldName: 'feed:{}' })
        }
      })
      if (response) {
        router.push('/')
      }
    } catch (e) {
      setErrors(formatValidationErrors(e.graphQLErrors[0], 'title'))
    }
  }

  return (
    <MainLayout title={ 'Photo create' }>
      <div className='photo__create__container'>
        <div className='photo__create__form__container'>
          <Formik<ICreatePhotoMutationVariables>
            validateOnBlur={ false }
            validateOnChange={ false }
            initialValues={ { title: '', picture: null } }
            onSubmit={ createPhotoHandler }
          >{ () => (
            <Form className='photo__create__form'>
              <Field
                type='text'
                name='title'
                placeholder='Title'
                className='photo__create__title'
                component={ InputAuthField } />
              <div className='photo__create__image-upload'>
                <Field
                  text={ 'Добавить фото' }
                  className='photo__create__image-upload__text'
                  name='picture'
                  type='file'
                  component={ DropzoneField } />
              </div>
              <div className='photo__create__btn__container'>
                <button
                  type='submit'
                  disabled={ loading }
                  className='photo__create__btn'>
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

export const getServerSideProps = async (ctx: NextPageContext) => {
  if (ctx.req) {
    const jid = getCookieParser(ctx.req)
    if (!jid()['jid']) {
      Redirect(ctx, '/accounts/login')
    }
  }
  return {
    props: {}
  }
}

export default withApollo({ ssr: false })(Create)
