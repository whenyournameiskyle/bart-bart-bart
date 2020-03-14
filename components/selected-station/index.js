import React, { useEffect, useState } from 'react'
import { object, string } from 'prop-types'
import styled from '@emotion/styled'

import Destination from '../../components/destination'
import Header from '../../components/header'
import Subheader from '../../components/subheader'
import currentTimeStringFormatter from '../../helpers/current-time-string-formatter'
import stationPlatformFormatter from '../../helpers/station-platform-formatter'

const SelectedStation = ({ selectedStation = {}, stationAbbr, stationName }) => {
  const [lastUpdated, setLastUpdated] = useState(currentTimeStringFormatter())
  const [platforms, setPlatforms] = useState(selectedStation)
  const hasStationInformation = !!platforms['1']

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const hasRecentStations = window.localStorage.getItem('recentStations')

      if (!hasRecentStations) {
        return window.localStorage.setItem('recentStations', `${stationAbbr}:${stationName}`)
      }

      const currentRecentStations = hasRecentStations.split(',')

      if (currentRecentStations.includes(`${stationAbbr}:${stationName}`)) {
        currentRecentStations.splice(currentRecentStations.indexOf(`${stationAbbr}:${stationName}`), 1)
      }

      currentRecentStations.unshift(`${stationAbbr}:${stationName}`)

      if (currentRecentStations.length > 3) {
        currentRecentStations.pop()
      }

      window.localStorage.setItem('recentStations', currentRecentStations.toString())
    }

    const fetchStationInfo = () => {
      if (stationAbbr) {
        fetch('https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + stationAbbr + '&key=MW9S-E7SL-26DU-VV8V&json=y')
          .then((response) => response.json())
          .then((data) => {
            const { etd: destinations } = data.root.station[0]
            const formattedStationInfo = stationPlatformFormatter(destinations)
            setPlatforms(formattedStationInfo)
            setLastUpdated(currentTimeStringFormatter())
          })
          .catch((error) => console.error(error))
      }
    }
    const interval = setInterval(() => fetchStationInfo(), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <Header shouldShowBack updatedTime={lastUpdated}>
        {stationName && stationName}
      </Header>
      <div>
        {hasStationInformation && Object.entries(platforms).map(([platformNumber, destinations]) => (
          <div key={platformNumber}>
            <Subheader>
              {`Platform ${platformNumber}`}
            </Subheader>
            {destinations.length && destinations.map(destination =>
              <Destination key={destination.destinationName} name={destination.destinationName} trains={destination.trains} />
            )}
          </div>
        ))}
      </div>
      {lastUpdated && <TimeText>train times last updated at {lastUpdated}</TimeText>}
    </div>
  )
}

SelectedStation.propTypes = {
  selectedStation: object,
  stationAbbr: string,
  stationName: string
}

const TimeText = styled.div`
  font-size: 0.75rem;

  @media(max-width: 368px) {
    font-size: 1.4rem;
  }
`

export default SelectedStation
