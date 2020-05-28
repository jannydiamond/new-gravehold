import React from 'react'

import ScreenReaderOnlyText from 'components/atoms/ScreenReaderOnlyText'
import Label from 'components/atoms/Label'
import Input from 'components/atoms/Input'
import Wrapper from './__styled__/Wrapper'

type Props = {
  id: string
  label: string
  labelHidden?: boolean
  name?: string
  onChange: (event: any) => void
  defaultValue?: any
  required?: boolean
}

const FormGroupInputNumber = ({
  id,
  label,
  labelHidden,
  name,
  onChange,
  defaultValue,
  required,
}: Props) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>
        {labelHidden ? (
          <ScreenReaderOnlyText>{label}</ScreenReaderOnlyText>
        ) : (
          label
        )}
      </Label>
      <Input
        id={id}
        name={name ? name : id}
        type="number"
        onChange={onChange}
        defaultValue={defaultValue}
        required={required}
      />
    </Wrapper>
  )
}

export default React.memo(FormGroupInputNumber)
