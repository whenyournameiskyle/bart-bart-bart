import React from 'react'
import { array, string } from 'prop-types'
import styled from '@emotion/styled'

import Destination from '../../components/destination'

export default class PlatformDirection extends React.Component {
  static propTypes = {
    direction: string,
    destinations: array
  }

  render() {
    const {
      destinations,
      direction,
    } = this.props

    return (
      <div className='PlatformDirectionContainer'>
        <PlatformDirectionHeader className='PlatformDirectionHeader'>
          {direction}
        </PlatformDirectionHeader>
          {destinations.map((destination, idx) => {
            return (
              <Destination
                destination={destination}
                key={idx}
              />
            )
          })}
      </div>
    )
  }
}

const PlatformDirectionHeader = styled.div`
  background-color: slategray;
  letter-spacing: 0.04em;
  padding: 0.75rem 0;

  @media(max-width: 368px) { 
    padding: 1rem 0;
  }
`