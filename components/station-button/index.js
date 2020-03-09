import React from 'react'
import { func, number, string } from 'prop-types'
import styled from '@emotion/styled'

const StationButton = ({ children, index, onClick }) => (
  <StyledButton 
    className='StationButton' 
    index={index}
    onClick={onClick} 
  > 
    {children}
  </StyledButton>
)

const StyledButton = styled.button`
  background-color: ${({index}) => index % 2 === 0 ? '#666' : '#888'};
  border: none;
  color: #ddd;
  font-size: 1.4rem;
  font-weight: 300;
  height: 4rem;
  letter-spacing: 0.03em;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  text-align: left;
  text-transform: uppercase;
  width: 100%;

  @media(max-width: 368px) { 
    font-size: 1.6rem;
    height: 8rem;
  }
`

StationButton.propTypes = {
  index: number,
  onClick: func,
  stationAbbr: string,
}

export default StationButton