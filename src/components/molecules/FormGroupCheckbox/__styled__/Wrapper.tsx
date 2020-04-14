import styled from 'styled-components/macro'

import Label from 'components/atoms/Label'

const Wrapper = styled('div')`
  margin-bottom: 16px;

  ${Label} {
    font-size: 16px;
    margin-bottom: 0;
  }

  input {
    margin: 0 8px 0 0;
  }
`

export default Wrapper
