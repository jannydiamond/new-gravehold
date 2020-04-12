import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'

import { RootState, selectors, actions } from 'Redux/Store'

import Preview from 'components/molecules/Preview'
import Label from 'components/atoms/Label'
import Button from 'components/atoms/Button'

import Wrapper from './__styled__/Wrapper'
import Form from './__styled__/Form'

const mapStateToProps = (state: RootState) => ({
  name: selectors.DraftExpedition.Name.getExpeditionName(state),
  bigPocketVariantConfig: selectors.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(state)
})

const mapDispatchToProps = {
  setExpeditionName: actions.DraftExpedition.Name.setExpeditionName,
  setBigPocketVariantConfig:
    actions.DraftExpedition.BigPocketVariantConfig.setBigPocketVariantConfig,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

type FormData = {
  name: string | undefined,
  bigPocketVariantConfig: boolean
}

const Configurator = ({
  name,
  bigPocketVariantConfig,
  setExpeditionName,
  setBigPocketVariantConfig,
}: Props) => {
  const { handleSubmit, register, errors } = useForm<FormData>()

  const onSubmit = ({ name, bigPocketVariantConfig }: FormData) => {
    console.log({ name, bigPocketVariantConfig })
  }

  const handleInputChange = (event: any) => {
    setExpeditionName(event.target.value)
  }

  const handleCheckboxChange = (event: any) => {
    setBigPocketVariantConfig(event.currentTarget.checked)
  }

  // ToDo: REFACTOR: Split form into own components
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Basic Information</legend>
          <Label htmlFor="name">Expedition Name</Label>
          <input
            id="name"
            name="name"
            ref={register({
              required: 'Required',
            })}
            onChange={handleInputChange}
            defaultValue={name}
          />
          {errors.name && errors.name.message}

          <Label htmlFor="bigPocketVariantConfig">
            <input
              id="bigPocketVariantConfig"
              type="checkbox"
              name="bigPocketVariantConfig"
              ref={register}
              onChange={handleCheckboxChange}
              defaultChecked={bigPocketVariantConfig}
            />
            Big Pocket Mode
          </Label>

          {errors.bigPocketVariantConfig &&
            errors.bigPocketVariantConfig.message}
        </fieldset>

        <Button type="submit">Submit</Button>
      </Form>
      <Preview />
    </Wrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Configurator))
