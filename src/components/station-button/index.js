import React from 'react'
import '../../style.css'

class StationButton extends React.Component {
  constructor(props) {
    super()

    this.handleStationClick = this.handleStationClick.bind(this)
  }

  handleStationClick() {
    if (this.props.onClick) this.props.onClick(this.props.stationAbbr)
  }

  render() {
    return (
      <button className='stationButton' onClick={this.handleStationClick} > {this.props.stationName} </button>
    )
  }
}

StationButton.propTypes = {
  onClick: React.PropTypes.func,
  stationName: React.PropTypes.string,
  stationAbbr: React.PropTypes.string,
}

export default StationButton

