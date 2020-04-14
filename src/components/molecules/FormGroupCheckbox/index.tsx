import React from 'react'

import ScreenReaderOnlyText from 'components/atoms/ScreenReaderOnlyText'
import Label from 'components/atoms/Label'
import Wrapper from './__styled__/Wrapper'

type Props = {
  id: string
  label: string
  labelHidden?: boolean
  name?: string
  onChange: (event: any) => void
  defaultChecked: boolean
}

const FormGroupCheckbox = ({
  id,
  label,
  labelHidden,
  name,
  onChange,
  defaultChecked,
}: Props) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name={name ? name : id}
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        {labelHidden ? (
          <ScreenReaderOnlyText>{label}</ScreenReaderOnlyText>
        ) : (
          label
        )}
      </Label>
    </Wrapper>
  )
}

export default React.memo(FormGroupCheckbox)
