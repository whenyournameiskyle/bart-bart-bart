import React from 'react'
import { array, func } from 'prop-types'
import getDistance from 'geolib/es/getDistance'
import styled from '@emotion/styled'

import Header from '../../components/header'
import StationButton from '../../components/station-button'
import Subheader from '../../components/subheader'

export default class StationList extends React.Component {
  static propTypes = {
    onClick: func,
    stationList: array,
  }

  state = {
    closestStation: null,
  }

  handleGeolocationSuccess = ({latitude, longitude}) => {    
    const { stationList } = this.props
    if (!stationList.length) return

    let closestStation = stationList[0]
    let closestDistance = getDistance({latitude: parseFloat(closestStation.gtfs_latitude), longitude: parseFloat(closestStation.gtfs_longitude)}, {latitude, longitude})
    
    for (let i = 1; i < stationList.length; i++) {
      let newDistance = getDistance({latitude: parseFloat(stationList[i].gtfs_latitude), longitude: parseFloat(stationList[i].gtfs_longitude)}, {latitude, longitude})
      if (newDistance < closestDistance) {
        closestDistance = newDistance
        closestStation = stationList[i]
      }
    }
    this.setState({ closestStation })
  }

  handleOnClick = (stationAbbr) => {
    const { onClick } = this.props
    if (onClick) onClick(stationAbbr)
  }

  componentDidMount () {
    const { stationList } = this.props
    if (stationList.length && 'geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => this.handleGeolocationSuccess(position.coords), 
        (err) => err,
        {'timeout': 15000,'maximumAge': 60000}
      )
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { stationList } = this.props
    if (!prevProps.stationList.length && stationList.length && 'geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition((position) => this.handleGeolocationSuccess(position.coords), (err) => err, {'timeout': 15000,'maximumAge': 60000})
    }
  }

  render () {
    const { stationList } = this.props
    const { closestStation } = this.state

    return (
      <div className='StationListContainer'>
        <Header>
          Pick a BART Station
        </Header>
        {closestStation &&
          <ClosestStationContainer>
            <Subheader>
              Closest Station
            </Subheader>
            <StationButton
              onClick={() => this.handleOnClick(closestStation.abbr)}
            >
              {closestStation.name}
            </StationButton>
          </ClosestStationContainer>
        }
        {closestStation &&
          <Subheader>
            All Stations
          </Subheader>
        }
        {stationList.length 
          ? stationList.map((station, index) => (
              <StationButton
                index={index}
                key={station.abbr}
                onClick={() => this.handleOnClick(station.abbr)}
              >
                {station.name}
              </StationButton>
            )
          )
          : <div>Loading...</div>
        }
      </div>
    )
  }
}

const ClosestStationContainer = styled.div`
  padding-bottom: 2rem;
`