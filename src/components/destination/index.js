import React from 'react'
import '../../style.css'

class Destination extends React.Component {
  constructor(props) {
    super()
  }



  render() {
    return (
      <div className='destinationContainer'>
        <div className='destinationText'>{this.props.destination.name}</div>
        <div className='trainTimeContainer'>
          { this.props.destination.trains.map((train, idx) => {
            return ( <div className='trainText' key={idx}><span className='trainMinuteText'>{train.minutesUntil} min</span> <span className='trainCarText'>({train.cars} car)</span></div> )
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


