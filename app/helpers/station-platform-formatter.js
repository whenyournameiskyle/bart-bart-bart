'use strict'

export default (destinations) => {
  const formattedStationInfo = {}
  if (destinations && destinations.length) {
    for (let i = 0; i < destinations.length; i++) {
      const upcomingTrains = []
      const destination = destinations[i]
      for (let j = 0; j < destination.estimate.length; j++) {
        const train = destination.estimate[j]
        upcomingTrains.push({
          cars: train.length,
          color: train.color.toLowerCase(),
          minutesUntil: train.minutes === 'Leaving' || train.minutes - 1 < 1 ? 'Now' : train.minutes - 1,
        })
      }

      const estObj = {
        destinationName: destination.destination,
        trains: upcomingTrains,
      }

      const destinationPlatform = destination?.estimate[0]?.platform
      if (formattedStationInfo[destinationPlatform] && formattedStationInfo[destinationPlatform].push) {
        formattedStationInfo[destinationPlatform].push(estObj)
      } else {
        formattedStationInfo[destinationPlatform] = [estObj]
      }
    }
  }
  return formattedStationInfo
}
