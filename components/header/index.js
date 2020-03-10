import React from 'react'
import { func } from 'prop-types'
import styled from '@emotion/styled'

import currentTimeStringFormatter from '../../helpers/current-time-string-formatter'

const Header = ({ children, onClick }) => (
  <HeaderContainer className='HeaderContainer'>
    {onClick
      ? <BackButton
          className='BackButton'
          onClick={onClick}
        >
          ←
        </BackButton>
      : null
    }
    <div>
      <div>{children}</div>
      <TimeText className='TimeText'>{currentTimeStringFormatter()}</TimeText>
    </div>
  </HeaderContainer>
)

const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  font-weight: 500;
  justify-content: center;
  margin: 0 auto;
  padding: 1rem 2rem;
  position: relative;

  @media(max-width: 368px) {
    padding: 1rem;
  }
`

const BackButton = styled.button`
  background-color: #333;
  border: none;
  color: #ddd;
  font-size: 1.6rem;
  font-weight: 300;
  left: 0;
  padding: 0.5rem;
  position: absolute;
`

const TimeText = styled.div`
  font-size: 0.9rem;

  @media(max-width: 368px) {
    font-size: 1.4rem;
  }
`

Header.propTypes = {
  onClick: func,
}

export default Header
