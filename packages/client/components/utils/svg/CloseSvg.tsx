import React from 'react'

export const CloseSvg = React.memo(() => {
  return (
    <svg aria-label='Закрыть'
         fill='#262626' height='24' viewBox='0 0 48 48' width='24'>
      <path clipRule='evenodd'
            d='M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z'
            fillRule='evenodd' />
    </svg>
  )
})
