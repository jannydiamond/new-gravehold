import React from 'react'
import ReactDOM from 'react-dom'

import Wrapper from './Wrapper'
import Backdrop from './Backdrop'
import Content from './Content'
import Header from './Header'
import Body from './Body'
import Title from './Title'
import CloseButton from './CloseButton'
import Footer from './Footer'

type Props = {
  titleLabel: string
  titleColor?: string
  children: React.ReactChild
  closeModal: () => void
  footer?: React.ReactNode
}

const Modal = ({ titleColor, titleLabel, children, closeModal, footer }: Props) => {
  const domEl = document.getElementById('modal-root')

  if (!domEl) return null

  return ReactDOM.createPortal(
    <React.Fragment>
      <Wrapper>
        <Backdrop onClick={closeModal} />
        <Content>
          <Header>
            <Title variant="h2" themeColor={titleColor}>
              {titleLabel}
            </Title>
            <CloseButton onClick={closeModal}>
              <span className="material-icons">close</span>
            </CloseButton>
          </Header>
          <Body hasFooter={footer ? true : false}>{children}</Body>
          {footer && (
            <Footer>{footer}</Footer>
          )}
        </Content>
      </Wrapper>
    </React.Fragment>,
    domEl
  )
}

export default React.memo(Modal)
