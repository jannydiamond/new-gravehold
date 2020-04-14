import React from 'react'
import styled from 'styled-components'

import H2 from 'components/atoms/H2'

type Props = {
  themeColor: string
}

// NOTE: we need to take away additional props, so that they are not passed
// to DOM elements by MUI Components (we really should get rid of MUI...)
const Title = styled(({ themeColor, ...rest }) => <H2 {...rest} />)<Props>`
  color: ${props => props.themeColor};
  margin: 0;
`

export default Title
