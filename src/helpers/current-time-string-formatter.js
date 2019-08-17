export default () => {
	let time = new Date()
  let hour = time.getHours()
  let amOrPm = 'am'

  if (hour >= 12) {
    amOrPm = 'pm'
    hour = hour === 12 ? hour : hour - 12
  } else {
    hour = hour === 0 ? (hour + 12) : hour
  }

  let minute = time.getMinutes().toString()
  minute = minute.length === 1 ? ('0' + minute) : minute
  time = hour + ':' + minute + amOrPm

  return time
}