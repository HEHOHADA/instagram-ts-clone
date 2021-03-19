import React from 'react'

const OrComponent = () => {
  return (
    <div className='form__or__item'>
      <div className='or__item__line' />
      <div className='or__text'>или</div>
      <div className='or__item__line' />
    </div>
  )
}


export default React.memo(OrComponent)
