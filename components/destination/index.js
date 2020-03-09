import React from 'react'
import { object } from 'prop-types'
import styled from '@emotion/styled'

const Destination = ({ name, trains }) => (
  <DestinationContainer className='DestinationContainer'>
    <DestinationText color={trains ? trains.length && trains[0].color : 'white' }>
      {name}
    </DestinationText>
    <TrainsContainer className='TrainsContainer'>
      {trains && trains.map((train, idx) => {
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

const DestinationContainer = styled.div`
  letter-spacing: 0.04rem;
  text-transform: uppercase;
  text-align: left;
`

const DestinationText = styled.div`
  background-color: ${({color}) => color || 'slategray'};
  color: #333;
  font-size: 1.2rem;
  padding: 0.5rem;

  @media(max-width: 368px) {
    font-size: 1.6rem;
  }
`

const TrainsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0 1rem 0;
  text-align: left;

  .trainMinuteText {
    font-size: 1rem;
    font-weight: 500;
  }

  .trainCarText {
    font-size: 0.75rem;
  }

  @media(max-width: 368px) {
    flex-direction: column;
    padding-left: 0.5rem;

    .trainMinuteText {
      font-size: 1.6rem;
      font-weight: 500;
    }

    .trainCarText {
      font-size: 1.2rem;
    }
  }
`

Destination.propTypes = {
  destination: object,
}

export default Destination
