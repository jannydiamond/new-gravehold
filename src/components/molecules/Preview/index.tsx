import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors } from 'Redux/Store'

import { saveToFile, copyToClipboard } from 'helpers'

import Wrapper from './__styled__/Wrapper'

const mapStateToProps = (state: RootState) => ({
  name: selectors.DraftExpedition.Name.getExpeditionName(state),
  bigPocketVariantConfig: selectors.DraftExpedition.BigPocketVariantConfig.getBigPocketVariantConfig(state)
})

type Props = ReturnType<typeof mapStateToProps> & {
  fileName?: string,
}

const Preview = ({
  fileName = 'expedition',
  name,
  bigPocketVariantConfig,
}: Props) => {
  const data = {
    name: name,
    bigPocketVariantConfig: bigPocketVariantConfig,
  }

  const handleCopyToClipboard = () => {
    copyToClipboard(JSON.stringify(data, null, '  '))
  }

  const handleSave = () => {
    saveToFile(JSON.stringify(data, null, '  '), fileName)
  }

  return (
    <Wrapper>
      <code>
        <pre>{JSON.stringify(data, null, '  ')}</pre>
      </code>

      <button type="button" onClick={handleCopyToClipboard}>
        Copy to clipboard
      </button>
      <button type="button" onClick={handleSave}>
        Save to file
      </button>
    </Wrapper>
  )
}

export default connect(
  mapStateToProps
)(React.memo(Preview))
