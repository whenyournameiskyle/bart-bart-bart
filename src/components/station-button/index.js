import React from 'react'
import { func, number, string } from 'prop-types'
import styled from '@emotion/styled'

export default class StationButton extends React.Component {
  static propTypes = {
    index: number,
    onClick: func,
    stationAbbr: string,
  }

  handleStationClick = () => {
    const { onClick, stationAbbr } = this.props
    if (onClick) onClick(stationAbbr)
  }

  render() {
    const {
      children,
      index
    } = this.props

    return (
      <StyledButton 
        className='StationButton' 
        index={index}
        onClick={this.handleStationClick} 
      > 
        {children}
      </StyledButton>
    )
  }
}

const StyledButton = styled.button`
  background-color: ${({index}) => index % 2 === 0 ? '#666' : '#888'};
  border-radius: 5px;
  border: none;
  color: #ddd;
  font-size: 1.6rem;
  font-weight: 300;
  height: 4rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  width: 100%;
`