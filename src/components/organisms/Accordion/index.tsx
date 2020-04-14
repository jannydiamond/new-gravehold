import React, { useState } from 'react'

import Wrapper from './__styled__/Wrapper'
import Header from './__styled__/Header'
import Summary from './__styled__/Summary'
import Content from './__styled__/Content'
import SummaryIcon from './__styled__/SummaryIcon'

type Props = {
  id: string
  title: string
  open?: boolean
  children: React.ReactNode
}

const Accordion = ({
  id,
  title,
  open,
  children
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(open ? open : false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Wrapper>
      <Header>
        <Summary
          id={`${id}Summary`}
          type="button"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls={`${id}Content`}
          onClick={handleClick}
        >
          {title}
          <SummaryIcon className="material-icons">
            {isOpen ? 'expand_less' : 'expand_more'}
          </SummaryIcon>
        </Summary>
      </Header>
      <Content
        id={`${id}Content`}
        role="region"
        aria-labelledby={`${id}Summary`}
        hidden={isOpen ? false : true}
      >
        { children }
      </Content>
    </Wrapper>
  )
}

export default React.memo(Accordion)
