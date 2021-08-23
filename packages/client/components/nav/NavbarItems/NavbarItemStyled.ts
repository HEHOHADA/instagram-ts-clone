import styled from 'styled-components'

export const NavItemWrapper = styled.div`
  margin-left: 22px;

  .image__item {
    cursor: pointer;
  }
`

export const ImageWrapper = styled.div <{ $height?: number, pointer?: boolean }>`
  height: ${ ({ $height }) => `${ $height }px` };
  width: ${ ({ $height }) => `${ $height }px` };
  cursor: ${ ({ pointer }) => pointer ? 'pointer' : 'default' };
  
  & > img {
    width: 100%;
    border-radius: 50%;
    height: 100%;
  }
`
