import React from 'react'

import ScreenReaderOnlyText from 'components/atoms/ScreenReaderOnlyText'
import Wrapper from './__styled__/Wrapper'
import Legend from './__styled__/Legend'

type Props = {
  legend: string
  legendVisible?: boolean
  children: React.ReactNode
}

const Fieldset = ({
  legend,
  legendVisible,
  children,
}: Props) => {
  return (
    <Wrapper>
      <Legend>
        {
          legendVisible 
            ? (legend) 
            : (<ScreenReaderOnlyText>{legend}</ScreenReaderOnlyText>)
        }
      </Legend>
      {children}
    </Wrapper>
  )
}

export default React.memo(Fieldset)
