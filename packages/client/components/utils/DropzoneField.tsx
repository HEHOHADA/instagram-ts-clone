import React, { FC } from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import { FieldProps } from 'formik'

type PropsTypePicture = {
  onDrop: (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void) | undefined
  text: string
  className: string
}

export const DropzonePictureProfile: FC<PropsTypePicture> = ({onDrop, className, text}) => {
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    onDrop: onDrop,
    accept: 'image/jpeg, image/png'
  })
  const {
    onKeyDown,
    onKeyDownCapture,
    onKeyPress,
    onKeyPressCapture,
    onKeyUp,
    onKeyUpCapture,
    ...props
  } = getRootProps()
  return (
    <div{ ...props }>
      <input { ...getInputProps() }/>
      <p className={ className }>{ text }</p>
    </div>
  )
}

type PropsType = {
  className: string
  text: string
}
export const DropzoneField: React.FC<FieldProps & PropsType>
  = ({
       field: {name, value},
       form: {setFieldValue, values, setValues},
       ...props
     }) => {
  const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/jpeg, image/png',
      multiple: false,
      onDrop: ([file]) =>
        setFieldValue(name, file),
      ...props
    }
  )
  const {
    onKeyDown,
    onKeyDownCapture,
    onKeyPress,
    onKeyPressCapture,
    onKeyUp,
    onKeyUpCapture,
    ...dropDownProps
  } = getRootProps({className: 'dropzone'})
  let pUrl = values.pictureUrl

  if (value) {
    if (!pUrl) {
      pUrl = URL.createObjectURL(value)
    }
  }

  return (
    <div>
      <div { ...dropDownProps }>
        <input { ...getInputProps() } />
        <p className={ props.className }
        >{ props.text }</p>
      </div>
      { pUrl && <div style={ {display: 'flex', justifyContent: 'center'} }>
        <img className="" src={ pUrl } alt="" style={ {
          paddingBottom: 20,
          maxHeight: '100%',
          maxWidth: 800
        } }/>
      </div> }
      { pUrl && <button
        className="dropzone__btn"
        onClick={ () => setValues({...values, picture: null}) }>Remove photo
      </button> }
    </div>
  )
}
