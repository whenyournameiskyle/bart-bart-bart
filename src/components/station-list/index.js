import React from 'react'
import { array, func } from 'prop-types'

import StationButton from '../../components/station-button'
import Header from '../../components/header'

export default class StationList extends React.Component {
  static propTypes = {
    onClick: func,
    stationList: array,
  }

  render() {
    const {
      onClick,
      stationList,
    } = this.props

    return (
      <div className='StationListContainer'>
        <Header>
          Select BART Station
        </Header>
        {stationList.length 
          ? stationList.map((station, index) => {
            return (
              <StationButton
                index={index}
                key={station.abbr}
                onClick={onClick}
                stationAbbr={station.abbr}
              >
                {station.name}
              </StationButton>
            )
          })
          : <div>Loading...</div>
        }
      </div>
    )
  }
}