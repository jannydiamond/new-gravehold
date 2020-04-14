import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import Accordion from 'components/organisms/Accordion'
import Fieldset from 'components/molecules/Fieldset'
import FormGroupInputText from 'components/molecules/FormGroupInputText'
import FormGroupCheckbox from 'components/molecules/FormGroupCheckbox'

const mapStateToProps = (state: RootState) => ({
  expeditionName: selectors.DraftExpedition.Name.getExpeditionName(state),
  bigPocketVariantConfig: selectors.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(
    state
  ),
})

const mapDispatchToProps = {
  setExpeditionName: actions.DraftExpedition.Name.setExpeditionName,
  setBigPocketVariantConfig:
    actions.DraftExpedition.BigPocketVariantConfig.setBigPocketVariantConfig,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const BasicInformation = ({
  expeditionName,
  bigPocketVariantConfig,
  setExpeditionName,
  setBigPocketVariantConfig,
}: Props) => {

  const handleNameChange = (event: any) => {
    setExpeditionName(event.target.value)
  }

  const handleBigPocketChange = (event: any) => {
    setBigPocketVariantConfig(event.currentTarget.checked)
  }

  return (
    <Accordion id="basicInformation" title="Basic Information" open>
      <Fieldset legend="Basic Information">
        <FormGroupInputText
          id="expeditionName"
          label="Expedition Name"
          onChange={handleNameChange}
          defaultValue={expeditionName}
        />
        <FormGroupCheckbox
          id="bigPocketVariantConfig"
          label="Big Pocket Mode"
          onChange={handleBigPocketChange}
          defaultChecked={bigPocketVariantConfig}
        />
      </Fieldset>
    </Accordion>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInformation)
