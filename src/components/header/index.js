import React from 'react'
import { bool, func } from 'prop-types'
import styled from '@emotion/styled'

export default class Header extends React.Component {
  static propTypes = {
    onClick: func,
    showBackButton: bool,
  }

  render() {
    const {
      children,
      onClick,
      showBackButton,
    } = this.props
    
    let time = new Date()
    let hour = time.getHours() 
    hour = (hour > 12) ? (hour - 12) : (hour === 0 ? (hour + 12) : hour) 
    let minute = time.getMinutes().toString()
    minute = minute.length === 1 ? ('0' + minute) : minute
    time = hour + ':' + minute
    
    return (
      <HeaderContainer className='HeaderContainer'>
        {showBackButton 
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
          <TimeText className='TimeText'>{time}</TimeText>
        </div>
      </HeaderContainer>
    )
  }
}

const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  font-weight: 500;
  justify-content: center;
  margin: 0 auto;
  padding: 0.5rem 2rem;
  position: relative;
`

const BackButton = styled.button`
  background-color: #222;
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
`