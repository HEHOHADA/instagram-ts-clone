import styled from 'styled-components'
import { themeColor } from '@/themes'
import { IconButton } from '@/components/common/buttons'
import { DropDown } from '@/components/common/DropDown/DropDown'
import { LinkStyled } from '../link/LinkStyled'

export const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: 0.4s;
  line-height: 30px;
  width: 0;
`

export const HeaderSearch = styled.div`
  position: relative;
  background: ${ themeColor('navyLight') };
  height: 30px;
  border-radius: 40px;

  &:hover > ${ SearchInput } {
    width: 240px;
    padding: 0 10px;
  }

  &:hover > ${ SearchInput } {
    background: white;
    color: #2f3640;
  }
`

export const SearchButton = styled(IconButton).attrs({
  height: '30px',
  width: '30px'
})`
  color: white;
  float: right;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #2f3640;
  justify-content: center;
  align-items: center;
  transition: .4s;
`

export const SearchDropDown = styled(DropDown)`
  position: absolute;
  top: 58px;
  width: 250px;
  right: 10px;
`

export const SearchDropDownLink = styled(LinkStyled)`
  display: flex;
  height: 50px;
  align-items: center;
  border-radius: 8px;
  transition: background 500ms;
  padding: 0.5rem;

  &:hover {
    background-color: #e2e3e6;
  }
`
