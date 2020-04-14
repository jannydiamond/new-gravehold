import styled from 'styled-components'

const CloseButton = styled('button')`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color .2s ease;

  &:hover {
    color: #2196f3;
  }
`

export default CloseButton
