import React from 'react'

export const CommentTools = () => {

  // const tools = useMemo(() => {
  //
  // }, [])

  return (
      <div className="content__tools__options">
        <div className="tool">
                                <span className="material-icons">
                                    favorite
                                </span>

        </div>
        <div className="tool">
                                <span className="material-icons">
                                    forum
                                </span>

        </div>
        <div className="tool">
                                 <span className="material-icons">
                                      comment
                                 </span>
        </div>
        <div className="tool__save">
                                <span className="material-icons">
                                    save_alt
                                </span>
        </div>
      </div>
  )
}
