import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import Accordion from 'components/organisms/Accordion'
import Fieldset from 'components/molecules/Fieldset'
import FormGroupInputText from 'components/molecules/FormGroupInputText'
import FormGroupCheckbox from 'components/molecules/FormGroupCheckbox'

const mapStateToProps = (state: RootState) => ({
  expeditionName: selectors.DraftExpedition.Name.getExpeditionName(state),
  seed: selectors.DraftExpedition.SeedConfig.getSeed(state),
  bigPocketVariantConfig: selectors.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(
    state
  ),
})

const mapDispatchToProps = {
  setExpeditionName: actions.DraftExpedition.Name.setExpeditionName,
  setSeed: actions.DraftExpedition.SeedConfig.setSeed,
  setBigPocketVariantConfig:
    actions.DraftExpedition.BigPocketVariantConfig.setBigPocketVariantConfig,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const BasicInformation = ({
  expeditionName,
  seed,
  bigPocketVariantConfig,
  setExpeditionName,
  setSeed,
  setBigPocketVariantConfig,
}: Props) => {
  const handleNameChange = (event: any) => {
    setExpeditionName(event.target.value)
  }

  const handleBigPocketChange = (event: any) => {
    setBigPocketVariantConfig(event.currentTarget.checked)
  }

  const handleSeedChange = (event: any) => {
    setSeed(event.target.value)
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
        <FormGroupInputText
          id="seed"
          label="Seed"
          onChange={handleSeedChange}
          defaultValue={seed}
        />
      </Fieldset>
    </Accordion>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicInformation)
