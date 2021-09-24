import styles from '../../styles/Home.module.css'

export const Destination = ({ name, trains }) => {
  if (!trains || !trains.length) return <div />

  const destinationColor = trains[0].color || 'gray'

  return (
    <div className={styles.destination}>
      <div className={`${styles.destinationHeader} ${styles[destinationColor]}`}>
        {name}
      </div>
      <div className={styles.trainList}>
        {trains && trains.map((train, idx) => {
          return (
            <div key={idx}>
              <span className={styles.trainMinuteText}>
                {train.minutesUntil === 'Now'
                  ? train.minutesUntil
                  : `${train.minutesUntil} min`}
              </span>
              <span className={styles.trainCarText}> ({train.cars} car)</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
