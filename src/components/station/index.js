import React from 'react'
import { func, string } from 'prop-types'
import styled from '@emotion/styled'

import Destination from '../../components/destination'
import Header from '../../components/header'
import Subheader from '../../components/subheader'
import currentTimeStringFormatter from '../../helpers/current-time-string-formatter'

export default class Station extends React.Component {
  static propTypes = {
    onBackClick: func,
    stationAbbr: string,
  }

  state = {
    lastUpdated: '',
    loading: false,
    stationInfo: {
      name: '',
      northbound: [],
      southbound: []
    },
  }

  fetchStationInfo (stationAbbr) {
  	this.setState({loading : true}, () => {
      if (stationAbbr) {
        fetch('https://api.bart.gov/api/etd.aspx?cmd=etd&orig=' + stationAbbr + '&key=MW9S-E7SL-26DU-VV8V&json=y')
        .then((response) => response.json())
        .then((responseJson) => {
          this.handleStationInformation(responseJson.root.station[0])
        })
        .catch((error) => {
          this.setState({ error : error })
        })
      }
    })
  }

  handleStationInformation (stationInfo) {
    let stationProps = {
      name: stationInfo.name,
      northbound: [],
      southbound: []
    }
    const destinations = stationInfo.etd
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
        ? stationProps.northbound.push(estObj) 
        : stationProps.southbound.push(estObj)
    }

    this.setState(prevState => ({
      lastUpdated: currentTimeStringFormatter(),
      loading: false,
      stationInfo: {
        ...prevState.stationInfo,
        ...stationProps
      }
    }))
  }

  componentDidMount () {
    const { stationAbbr } = this.props
  	this.fetchStationInfo(stationAbbr)
    setTimeout(() => { this.fetchStationInfo(stationAbbr) }, 60000)
  }

  render () {
    const { onBackClick } = this.props
    const {
      lastUpdated,
      loading,
      stationInfo
    } = this.state

    const hasNorthboundInfo = stationInfo.northbound.length
    const hasSouthboundInfo = stationInfo.southbound.length

    return (
      <div>
 	  		<Header onClick={onBackClick}>
          {!stationInfo.name || loading ? ' ' : stationInfo.name}
        </Header>
        {loading 
          ? <div>Loading...</div>
          : <div>
    	    <Subheader>
            Northbound
          </Subheader>
          <div>
            {hasNorthboundInfo &&
              stationInfo.northbound.map((destination, idx) => {
              return (
                <Destination
                  destination={destination}
                  key={idx}
                />
              )
            })}
          </div>
          <Subheader>
            Southbound
          </Subheader>
          <div>
            {hasSouthboundInfo &&
              stationInfo.southbound.map((destination, idx) => {
              return (
                <Destination
                  destination={destination}
                  key={idx}
                />
              )
            })}
          </div>
          <TimeText>train times last updated at {lastUpdated}</TimeText>
        </div>
      }
	   </div>
    )
  }
}


const TimeText = styled.div`
  font-size: 0.75rem;
  margin-top: 0.75rem;

  @media(max-width: 368px) { 
    font-size: 1.2rem;
  }
`
