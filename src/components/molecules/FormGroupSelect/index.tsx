import React from 'react'

import * as types from 'types'

import ScreenReaderOnlyText from 'components/atoms/ScreenReaderOnlyText'
import Label from 'components/atoms/Label'
import Select from 'components/atoms/Select'
import Wrapper from './__styled__/Wrapper'

type Props = {
  id: string
  options: types.SelectOptions
  label: string
  labelHidden?: boolean
  name?: string
  onChange: (event: any) => void
  defaultValue?: any
  required?: boolean
  isMulti?: boolean
}

const FormGroupInputText = ({
  id,
  options,
  label,
  labelHidden,
  name,
  onChange,
  defaultValue,
  required,
  isMulti,
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
      <Select
        options={options}
        classNamePrefix="ReactSelect"
        id={id}
        name={name ? name : id}
        onChange={onChange}
        defaultValue={defaultValue}
        required={required}
        isMulti={isMulti}
      />
    </Wrapper>
  )
}

export default React.memo(FormGroupInputText)
