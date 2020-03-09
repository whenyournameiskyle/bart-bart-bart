import React from 'react'
import styled from '@emotion/styled'

const Subheader = ({ children }) => (
  <SubheaderStyle className='Subheader'>
    {children}
  </SubheaderStyle>
)

const SubheaderStyle = styled.div`
  background-color: slategray;
  letter-spacing: 0.04em;
  padding: 0.75rem 0;

  @media(max-width: 368px) { 
    padding: 1rem 0;
  }
`

export default Subheader