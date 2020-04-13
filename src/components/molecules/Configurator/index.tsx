import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import Preview from 'components/molecules/Preview'
import Label from 'components/atoms/Label'

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

  const handleInputChange = (event: any) => {
    setExpeditionName(event.target.value)
  }

  const handleCheckboxChange = (event: any) => {
    setBigPocketVariantConfig(event.currentTarget.checked)
  }

  // ToDo: REFACTOR: Split form into own components
  return (
    <Wrapper>
      <Form>
        <fieldset>
          <legend>Basic Information</legend>
          <Label htmlFor="name">Expedition Name</Label>
          <input
            id="name"
            name="name"
            onChange={handleInputChange}
            defaultValue={name}
          />

          <Label htmlFor="bigPocketVariantConfig">
            <input
              id="bigPocketVariantConfig"
              type="checkbox"
              name="bigPocketVariantConfig"
              onChange={handleCheckboxChange}
              defaultChecked={bigPocketVariantConfig}
            />
            Big Pocket Mode
          </Label>
        </fieldset>
      </Form>
      <Preview />
    </Wrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Configurator))
