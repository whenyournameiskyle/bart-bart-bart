import React from 'react'
import { object } from 'prop-types'
import styled from '@emotion/styled'

export default class Destination extends React.Component {
  static propTypes = {
    destination: object,
  }

  render() {
    const {
      destination
    } = this.props

    return (
      <DestinationContainer className='DestinationContainer'>
        <DestinationText color={destination.trains[0].color}>
          {destination.name}
        </DestinationText>
        <TrainsContainer className='TrainsContainer'>
          {destination.trains && destination.trains.map((train, idx) => {
            return ( 
              <div key={idx}>
                <span className='trainMinuteText'>
                  {train.minutesUntil === 'Now' 
                    ? train.minutesUntil 
                    : `${train.minutesUntil} min`
                  }
                </span>
                <span className='trainCarText'> ({train.cars} car)</span>
              </div>
            )
            })
          }
        </TrainsContainer>
      </DestinationContainer>
    )
  }
}

const DestinationContainer = styled.div`
  font-size: 1.15rem;
  letter-spacing: 0.04rem;
  text-transform: uppercase;
  text-align: left;
`

const DestinationText = styled.div`
  background-color: ${({color}) => color || 'slategray'};
  color: #333;
  padding: 0.5rem;
`

const TrainsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 0 0.5rem 0.5rem;
  text-align: left;

  .trainMinuteText {
    font-size: 0.85rem;
    font-weight: 500;
  }

  .trainCarText {
    font-size: 0.75rem;
    padding-right: 0.25rem;
  }
`

