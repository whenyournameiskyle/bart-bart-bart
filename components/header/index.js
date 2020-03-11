import React from 'react'
import { func } from 'prop-types'
import styled from '@emotion/styled'
import Link from 'next/link'

import currentTimeStringFormatter from '../../helpers/current-time-string-formatter'

const Header = ({ children, shouldShowBack, updatedTime }) => (
  <HeaderContainer className='HeaderContainer'>
    <div>
      {shouldShowBack
        && <Link href='/'>
            <BackButton className='BackButton'>
              ←
            </BackButton>
          </Link>
      }
      <div>{children}</div>
      <TimeText className='TimeText'>{updatedTime || currentTimeStringFormatter()}</TimeText>
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

const BackButton = styled.a`
  background-color: #333;
  border: none;
  color: #ddd;
  cursor: pointer;
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
