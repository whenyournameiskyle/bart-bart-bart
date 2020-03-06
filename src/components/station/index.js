import React, { useEffect, useState } from 'react'
import { func, string } from 'prop-types'
import styled from '@emotion/styled'

import Destination from '../../components/destination'
import Header from '../../components/header'
import Subheader from '../../components/subheader'
import currentTimeStringFormatter from '../../helpers/current-time-string-formatter'

const Station = ({ onBackClick, stationAbbr }) => {
  const [lastUpdated, setLastUpdated] = useState('')
  const [loading, setLoading] = useState(true)
  const [stationName, setStationName] = useState('')
  const [platforms, setPlatforms] = useState({})

  const handleStationInformation = ({ etd: destinations, name}) => {
    setStationName(name)
    const platformObject = {}

    for (var i = 0; i < destinations.length; i++) {
      let upcomingTrains = []
      const destination = destinations[i]
      for (var j = 0; j < destination.estimate.length; j++) {
        const train = destination.estimate[j]
        upcomingTrains.push({
          cars: train.length,
          color: train.color.toLowerCase(),
          minutesUntil: train.minutes === 'Leaving' ? 'Now' : train.minutes-1,
        })
      }

      const estObj = {
        destinationName: destination.destination,
        trains: upcomingTrains
      }

      const destinationPlatform = destination.estimate[0].platform
      if (platformObject[destinationPlatform] && platformObject[destinationPlatform].push) {
        platformObject[destinationPlatform].push(estObj)
      } else {
        platformObject[destinationPlatform] = [estObj]
      }
    }

    setLastUpdated(currentTimeStringFormatter())
    setPlatforms(platformObject)
    setLoading(false)
  }

  useEffect(() => {
    const fetchStationInfo = () => {
      if (stationAbbr) {
        setLoading(true)
        fetch('https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + stationAbbr + '&key=MW9S-E7SL-26DU-VV8V&json=y')
        .then((response) => response.json())
        .then((responseJson) => {
          handleStationInformation(responseJson.root.station[0])
        })
        .catch((error) => console.error(error))
      }
    }
    fetchStationInfo(stationAbbr)
    const interval = setInterval(() => fetchStationInfo(), 60000)
    return () => clearInterval(interval)
  }, [stationAbbr])

  const hasPlatforms = !!platforms['1']

  return (
    <div>
	  		<Header onClick={onBackClick}>
        {!stationName || loading ? ' ' : stationName}
      </Header>
      {loading
        ? <div>Loading...</div>
        : <div>
        {hasPlatforms && Object.entries(platforms).map(([platformNumber, destinations]) => (
          <div key={platformNumber}>
            <Subheader>
              Platform {platformNumber}
            </Subheader>
            {destinations.length && destinations.map(destination =>
              <Destination name={destination.destinationName} trains={destination.trains} />
            )}
          </div>
        ))}
        {lastUpdated &&
          <TimeText>train times last updated at {lastUpdated}</TimeText>
        }
      </div>
    }
   </div>
  )
}

const TimeText = styled.div`
  font-size: 0.75rem;
  margin-top: 0.75rem;

  @media(max-width: 368px) {
    font-size: 1.2rem;
  }
`

Station.propTypes = {
  onBackClick: func,
  stationAbbr: string,
}

export default Station
