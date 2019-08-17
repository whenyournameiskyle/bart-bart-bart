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
  const [northbound, setNorthbound] = useState([])
  const [southbound, setSouthbound] = useState([])

  const handleStationInformation = ({ etd: destinations, name}) => {
    setStationName(name)
    const northbound = []
    const southbound = []
    
    for (var i = 0; i < destinations.length; i++) {
      let upcomingTrains = []
      for (var j = 0; j < destinations[i].estimate.length; j++) {
        upcomingTrains.push({
          cars: destinations[i].estimate[j].length,
          color: destinations[i].estimate[j].color.toLowerCase(),
          minutesUntil: destinations[i].estimate[j].minutes === 'Leaving' ? 'Now' : destinations[i].estimate[j].minutes-1,
        })
      }

      const estObj = {
        name: destinations[i].destination,
        trains: upcomingTrains
      }

      destinations[i].estimate[0].direction === 'North' 
        ? northbound.push(estObj) 
        : southbound.push(estObj)
    }

    setLastUpdated(currentTimeStringFormatter())
    setNorthbound(northbound)
    setSouthbound(southbound)
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

  const hasNorthboundInfo = northbound.length || null
  const hasSouthboundInfo = southbound.length || null

  return (
    <div>
	  		<Header onClick={onBackClick}>
        {!stationName || loading ? ' ' : stationName}
      </Header>
      {loading 
        ? <div>Loading...</div>
        : <div>
  	    <Subheader>
          Northbound
        </Subheader>
        <div>
          {hasNorthboundInfo &&
            northbound.map((destination, idx) => (
              <Destination
                destination={destination}
                key={idx}
              />
            )
          )}
        </div>
        <Subheader>
          Southbound
        </Subheader>
        <div>
          {hasSouthboundInfo &&
            southbound.map((destination, idx) => (
              <Destination
                destination={destination}
                key={idx}
              />
            )
          )}
        </div>
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