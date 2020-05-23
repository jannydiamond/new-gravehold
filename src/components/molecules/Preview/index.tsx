import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors } from 'Redux/Store'

import { saveToFile, copyToClipboard } from 'helpers'

import Button from 'components/atoms/Button'
import Wrapper from './__styled__/Wrapper'
import Pre from './__styled__/Pre'

const mapStateToProps = (state: RootState) => ({
  name: selectors.DraftExpedition.Name.getExpeditionName(state),
  bigPocketVariantConfig: selectors.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(
    state
  ),
  branches: selectors.DraftExpedition.SequenceConfig.Branches.getBranches(
    state
  ),
})

type Props = ReturnType<typeof mapStateToProps> & {
  fileName?: string,
}

const Preview = ({
  fileName = 'expedition',
  name,
  bigPocketVariantConfig,
  branches,
}: Props) => {

  const dataBranches = branches.reduce((branches, branch) => {
    switch(branch.type) {
      case "narrative": {

        const newBranch = {
          type: branch.type,
          config: {
            text: branch.text,
            decisions: branch.decisions ? branch.decisions.map(decision => decision.text) : false
          }
        }

        return {
          ...branches,
          [branch.id]: newBranch,
        }
      }

      default: {
        return {
          ...branches,
          [branch.id]: {
            type: branch.type,
          }
        }
      }
    }
    
  }, {})

  const data = {
    name: name,
    bigPocketVariantConfig: bigPocketVariantConfig,
    sequenceConfig: {
      branches: dataBranches
    }
  }

  const handleCopyToClipboard = () => {
    copyToClipboard(JSON.stringify(data, null, '  '))
  }

  const handleSave = () => {
    saveToFile(JSON.stringify(data, null, '  '), fileName)
  }

  return (
    <Wrapper>
      <Pre>{JSON.stringify(data, null, '  ')}</Pre>

      <Button type="button" onClick={handleCopyToClipboard}>
        Copy to clipboard
      </Button>
      <Button type="button" onClick={handleSave}>
        Save to file
      </Button>
    </Wrapper>
  )
}

export default connect(
  mapStateToProps
)(React.memo(Preview))
