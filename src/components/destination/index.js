import React from 'react'
import '../../style.css'

class Destination extends React.Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div className='stationInfo'>
        <div className='stationName'>{this.props.destination.name}</div>
        <div className='stationText'>
        {
          this.props.destination.trains.map((train, idx) => {
            return (
              <div key={idx}>{train.minutesUntil} minutes – {train.cars} cars</div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

Destination.propTypes = {
  destination: React.PropTypes.object,
}

export default Destination


