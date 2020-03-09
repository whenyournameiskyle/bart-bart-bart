import React, { useEffect, useState } from 'react'
import { array, func } from 'prop-types'
import getDistance from 'geolib/es/getDistance'
import styled from '@emotion/styled'

import Header from '../../components/header'
import StationButton from '../../components/station-button'
import Subheader from '../../components/subheader'

const StationList = ({ onClick, stationList }) => {
  const [closestStation, setClosestStation] = useState(null)
  
  const handleGeolocationSuccess = ({latitude, longitude}) => {    
    let currentClosestStation = stationList[0]
    let closestDistance = getDistance({latitude: parseFloat(currentClosestStation.gtfs_latitude), longitude: parseFloat(currentClosestStation.gtfs_longitude)}, {latitude, longitude})
    
    for (let i = 1; i < stationList.length; i++) {
      let newDistance = getDistance({latitude: parseFloat(stationList[i].gtfs_latitude), longitude: parseFloat(stationList[i].gtfs_longitude)}, {latitude, longitude})
      if (newDistance < closestDistance) {
        closestDistance = newDistance
        currentClosestStation = stationList[i]
      }
    }
    setClosestStation(currentClosestStation)
  }

  const handleOnClick = (stationAbbr) => {
    if (onClick) onClick(stationAbbr)
  }

  useEffect(() => {
    const getCurrentPosition = () => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => handleGeolocationSuccess(position.coords), 
        (err) => err,
        {'timeout': 15000,'maximumAge': 60000}
      )
    }

    if (!closestStation && stationList.length && 'geolocation' in window.navigator) {
      getCurrentPosition()
    }

    const interval = setInterval(() => getCurrentPosition(), 300000)
    return () => clearInterval(interval)
  })

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
            onClick={() => handleOnClick(closestStation.abbr)}
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
              onClick={() => handleOnClick(station.abbr)}
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

const ClosestStationContainer = styled.div`
  padding-bottom: 2rem;
`

StationList.propTypes = {
  onClick: func,
  stationList: array,
}

export default StationList