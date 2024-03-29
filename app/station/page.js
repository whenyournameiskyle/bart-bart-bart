'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { Destination } from '../components/destination'
import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { Loading } from '../components/loading'
import { Subheader } from '../components/subheader'
import currentTimeStringFormatter from '../helpers/current-time-string-formatter'
import stationPlatformFormatter from '../helpers/station-platform-formatter'

export default function SelectedStation() {
  const searchParams = useSearchParams()
  const stationAbbr = searchParams.get('key')
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(currentTimeStringFormatter())
  const [stationName, setStationName] = useState('')
  const [platforms, setPlatforms] = useState()

  useEffect(() => {
    setIsLoading(true)
    const fetchStationInfo = async () => {
      if (stationAbbr) {
        try {
          const response = await fetch(`https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationAbbr}&key=MW9S-E7SL-26DU-VV8V&json=y`)
          const data = await response.json()
          const { etd: destinations } = data?.root?.station[0]
          const formattedStationInfo = stationPlatformFormatter(destinations)
          setPlatforms(formattedStationInfo)
          setStationName(data?.root?.station[0]?.name)
        } catch (e) {
          console.error('error in useEffect() fetchStationInfo()', e)
        }
        setLastUpdated(currentTimeStringFormatter())
        setIsLoading(false)
      }
    }
    fetchStationInfo()
    const interval = setInterval(async () => await fetchStationInfo(), 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (stationName && typeof window !== 'undefined' && window.localStorage) {
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
    <div>
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
