import React from 'react'


export const ModalWindowContainer: React.FC = React.memo((props) => {
  return (
      <div className="modal-window__background">
        <div className="modal-window__container">
          <div className="modal-window">
            { props.children }
          </div>
        </div>
      </div>
  )
})
