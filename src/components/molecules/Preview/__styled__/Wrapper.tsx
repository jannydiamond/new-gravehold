import styled from 'styled-components/macro'

const Wrapper = styled('div')`
  width: 50%;
  padding: 0 0 0 32px;

  @media all and (max-width: 920px) {
    width: 100%;
    padding: 32px 0 0 0;
  }
`

export default Wrapper
