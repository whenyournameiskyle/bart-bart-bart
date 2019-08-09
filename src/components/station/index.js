import React from 'react'
import '../../style.css'

import PlatformDirection from '../../components/platform-direction'
import Header from '../../components/header'

class Station extends React.Component {
  constructor(props) {
    super()

    this.state = {
      stationInfo: null,
      loading: false
    }
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
          minutesUntil: destinations[i].estimate[j].minutes === 'Leaving' ? 'Now' : destinations[i].estimate[j].minutes-1,
          cars: destinations[i].estimate[j].length
        })
      }
      const estObj = {
        name: destinations[i].destination,
        trains: upcomingTrains
      }
      destinations[i].estimate[0].direction === 'North' ? stationProps.northbound.push(estObj) : stationProps.southbound.push(estObj)
    }
    this.setState({stationInfo : stationProps, loading: false})
  }

  componentDidMount () {
  	this.fetchStationInfo(this.props.stationAbbr)
    setTimeout(() => {
      console.log('updating times')
      this.fetchStationInfo(this.props.stationAbbr)
    }, 60000);
  }

  render () {
    return (
      <div>
   	  {
   	  	(!this.state.stationInfo || this.state.loading)
   	  	? <Header
   	  		text='Loading...'
   	  	  />
   	  	: <div>
   	  		<Header
		      text={this.state.stationInfo.name}
		      showBackButton
		      onClick={this.props.onBackClick}
	      	/>
		    <PlatformDirection
  			  direction='Northbound'
          destinations={this.state.stationInfo.northbound}
  			/>
        <PlatformDirection
          direction='Southbound'
          destinations={this.state.stationInfo.southbound}
        />
		  </div>
	  }
	  </div>
    )
  }
}

Station.propTypes = {
  stationAbbr: React.PropTypes.string,
}

export default Station
