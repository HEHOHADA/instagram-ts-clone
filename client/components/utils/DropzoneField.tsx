import React from 'react'
import { useDropzone } from 'react-dropzone'


export const Dropzone = (props: any) => {
  const {onDrop, className, text} = props
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    multiple: false,
    onDrop: onDrop,
    accept: 'image/jpeg, image/png'
  })

  return (
      <div{ ...getRootProps() }>
        <input { ...getInputProps() } className="form-control-file"/>
        {
          isDragActive ?
              <p className={ className }>{ text }</p> :
              <p className={ className }>{ text }</p>
        }
      </div>
  )
}
