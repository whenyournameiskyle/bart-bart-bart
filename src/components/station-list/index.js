import React from 'react'
import { array, func } from 'prop-types'

import Header from '../../components/header'
import StationButton from '../../components/station-button'
import Subheader from '../../components/subheader'

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
    const hasClosestStation = false

    return (
      <div className='StationListContainer'>
        <Header>
          Pick a BART Station
        </Header>
        {hasClosestStation &&
          <Subheader>
            Closest Station
          </Subheader>
        }
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