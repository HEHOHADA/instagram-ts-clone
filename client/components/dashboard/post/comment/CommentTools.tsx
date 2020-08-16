import React, { FC, useMemo } from 'react'

type PropsType = {
  onLike:any
  isLiked:boolean
}

export const CommentTools :FC<PropsType>= (props) => {

  const tools = useMemo(() => {
    return [
      {onClick:props.onLike,iconName:'favorite',className:'tool',style:{color:props.isLiked? 'red' :'black'}},
      {onClick:()=>{},iconName:'forum',className:'tool'},
      {onClick:()=>{},iconName:'comment',className:'tool'},
      {onClick:()=>{},iconName:'save_alt',className:'tool__save'}
    ]
  }, [props.isLiked])

  return (
      <div className="content__tools__options">
        {tools.map((tool)=>(
            <div
                className={tool.className}
                 key={`${tool.iconName}_commentTool_${tool.className}`}
                 onClick={tool.onClick}>
              <span
                  style={{...tool?.style}}
                  className="material-icons">{tool.iconName}</span>
            </div>
        ))}
      </div>
  )
}
