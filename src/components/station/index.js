import React from 'react'
import { func, string } from 'prop-types'

import PlatformDirection from '../../components/platform-direction'
import Header from '../../components/header'

export default class Station extends React.Component {
  static propTypes = {
    onBackClick: func,
    stationAbbr: string,
  }

  state = {
    stationInfo: {
      name: '',
      northbound: [],
      southbound: []
    },
    loading: false
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
          this.setState({error : error})
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
      loading: false,
      stationInfo: {
        ...prevState.stationInfo,
        ...stationProps
      }
    }))
  }

  componentDidMount () {
    const {
      stationAbbr
    } = this.props

  	this.fetchStationInfo(stationAbbr)

    setTimeout(() => {
      console.info('updating BART times')
      this.fetchStationInfo(stationAbbr)
    }, 60000)
  }

  render () {
    const {
      onBackClick
    } = this.props
    
    const {
      loading,
      stationInfo
    } = this.state

    return (
      <div>
 	  		<Header
	       showBackButton
	       onClick={onBackClick}
      	>
          {!stationInfo.name || loading ? 'Loading...' : stationInfo.name}
        </Header>
  	    <PlatformDirection
  			  direction='Northbound'
          destinations={stationInfo.northbound}
  			/>
        <PlatformDirection
          direction='Southbound'
          destinations={stationInfo.southbound}
        />
	   </div>
    )
  }
}
