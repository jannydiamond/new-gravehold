import React from 'react'

import ModalBodyWrapper from 'components/atoms/ModalBodyWrapper'
import ModalFooterWrapper from 'components/atoms/ModalFooterWrapper'
import Button from 'components/atoms/Button'

const Prompt = ({
  yesHandler,
  noHandler,
  children,
}: {
  yesHandler: () => void
  noHandler: () => void
  children?: React.ReactChild
}) => {
  return (
    <React.Fragment>
      <ModalBodyWrapper hasFooter={true}>{children}</ModalBodyWrapper>
      <ModalFooterWrapper>
        <Button
          onClick={noHandler}
        >
          No
        </Button>
        <Button
          onClick={yesHandler}
        >
          Yes
        </Button>
      </ModalFooterWrapper>
    </React.Fragment>
  )
}

export default React.memo(Prompt)
