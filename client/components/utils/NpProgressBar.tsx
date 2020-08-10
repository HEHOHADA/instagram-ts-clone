import React from 'react'
import NextNProgress from '../../lib/ProgressBar'

export const NpTopProgressBar = React.memo(() => {
  return (
      <NextNProgress
          options={ {easing: 'ease', speed: 500} }
          color="#29D"
          startPosition={ 0.3 }
          stopDelayMs={ 200 }
          height={ 3 }
      />
  )
})
