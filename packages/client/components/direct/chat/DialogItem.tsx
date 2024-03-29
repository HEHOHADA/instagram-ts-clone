import React, { FC } from 'react'
import { Link } from '@/components/link'

type PropsType = {
  pictureUrl?: string | null
  username: string
  date?: string
  id: string
}

export const DialogItem: FC<PropsType> = ({ pictureUrl, id, username, date }) => {
  return (
    <Link as={ `/direct/t/${ id }` } href='/direct/[...slug]' passHref>
      <a className='direct__conversation'>
        <div className='conversation__img'>
          { pictureUrl && <img
            src={ pictureUrl }
            alt='Фото профиля yurfos' /> }
        </div>
        <div className='conversation__user__dialog'>
          <div className='user__name'>{ username }</div>
          { date &&
          <div className='user__last-seen'>{ new Date(parseInt(date)).toLocaleDateString() }</div> }
        </div>
      </a>
    </Link>
  )
}
