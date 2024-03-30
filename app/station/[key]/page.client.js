'use client'
import { useEffect, useState } from 'react'

import { Destination } from '../../components/destination'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { Loading } from '../../components/loading'
import { Subheader } from '../../components/subheader'

export default function SelectedStation({ fetchStationData, stationAbbr }) {
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('')
  const [stationName, setStationName] = useState('')
  const [platforms, setPlatforms] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const fetchFetch = async () => {
      try {
        const data = await fetchStationData()
        const { lastUpdated, platforms, stationName } = data
        setLastUpdated(lastUpdated)
        setPlatforms(platforms)
        setStationName(stationName)
        setIsLoading(false)
      } catch (e) {
        console.error('error in fetching station data', e)
        setIsLoading(false)
      }
    }
    fetchFetch()
    const interval = setInterval(async () => await fetchFetch(), 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (stationAbbr && stationName && typeof window !== 'undefined' && window.localStorage) {
      let currentRecentStations = window.localStorage.getItem('recentStations') || null
      const newStationObject = { [stationAbbr]: stationName }
      if (currentRecentStations) {
        if (currentRecentStations.includes(JSON.stringify(newStationObject))) {
          return
        }
        currentRecentStations = JSON.parse(currentRecentStations)
        if (currentRecentStations.length >= 3) {
          currentRecentStations.shift()
        }
        currentRecentStations.push(newStationObject)
        window.localStorage.setItem('recentStations', JSON.stringify(currentRecentStations))
      } else {
        window.localStorage.setItem('recentStations', JSON.stringify([newStationObject]))
      }
    }
  }, [stationAbbr, stationName])

  if (isLoading) return <Loading />

  return (
    <div className="container">
      {stationName ? (
        <>
          <Header shouldShowBack>{stationName}</Header>
          <div>
            {Object.keys(platforms)?.length &&
              Object.entries(platforms).map(([platformNumber, destinations]) => (
                <div key={platformNumber}>
                  <Subheader>{`Platform ${platformNumber}`}</Subheader>
                  {destinations?.map((destination) => (
                    <Destination key={destination.destinationName} name={destination.destinationName} trains={destination.trains} />
                  ))}
                </div>
              ))}
          </div>
          {lastUpdated && <div className="tinyText">train times last updated at {lastUpdated}</div>}
        </>
      ) : (
        <Header shouldShowBack>Station not found</Header>
      )}
      <Footer />
    </div>
  )
}
