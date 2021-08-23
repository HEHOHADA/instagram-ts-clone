import React, { FC, useMemo } from 'react'
import { LikeGetters } from '@/hooks'
import { IPhoto } from '@/geterated'
import { Icon } from '@/components/icons'
import {
  CommentToolsWrapper,
  DefaultTool,
  SaveTool
} from './CommentStyled'

type PropsType = Partial<LikeGetters> & Pick<IPhoto, 'isLiked'>

export const CommentTools: FC<PropsType> = (props) => {
  const tools = useMemo(() => {
    return [
      {
        onClick: props.onLike,
        iconName: 'favorite',
        color: props.isLiked ? 'red' : 'black'
      },
      {
        onClick: () => {
        }, iconName: 'forum'
      },
      {
        onClick: () => {
        }, iconName: 'comment'
      },
      {
        onClick: () => {
        }, iconName: 'save_alt', Wrapper: SaveTool
      }
    ]
  }, [props.isLiked])

  return (
    <CommentToolsWrapper>
      { tools.map((tool) => {
        const Wrapper = tool.Wrapper ?? DefaultTool
        return (
          <Wrapper
            key={ `${ tool.iconName }_commentTool` }
            onClick={ tool.onClick }>
            <Icon
              iconName={ tool.iconName }
              color={ tool.color } />
          </Wrapper>
        )
      }) }
    </CommentToolsWrapper>
  )
}
