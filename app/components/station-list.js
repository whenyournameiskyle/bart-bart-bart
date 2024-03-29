'use client'
import { useEffect, useState } from 'react'
import { getDistance } from 'geolib'
import Link from 'next/link'

import { Header } from './header'
import { Subheader } from './subheader'

export const StationList = ({ stationList = [] }) => {
  const [closestStation, setClosestStation] = useState({})
  const [recentStations, setRecentStations] = useState(null)

  const handleGeolocationSuccess = ({ latitude, longitude }) => {
    let currentClosestStation = stationList[0]
    if (!currentClosestStation.gtfs_latitude) return
    let closestDistance = getDistance(
      {
        latitude: parseFloat(currentClosestStation.gtfs_latitude),
        longitude: parseFloat(currentClosestStation.gtfs_longitude),
      },
      { latitude, longitude },
    )

    for (let i = 1; i < stationList.length; i++) {
      const newDistance = getDistance(
        { latitude: parseFloat(stationList[i].gtfs_latitude), longitude: parseFloat(stationList[i].gtfs_longitude) },
        { latitude, longitude },
      )
      if (newDistance < closestDistance) {
        closestDistance = newDistance
        currentClosestStation = stationList[i]
      }
    }
    setClosestStation(currentClosestStation)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let currentRecentStations = window.localStorage.getItem('recentStations') || null
      if (currentRecentStations) {
        try {
          currentRecentStations = JSON.parse(currentRecentStations)
          setRecentStations(currentRecentStations)
        } catch (e) {
          console.error(`error in StationList useEffect() attempting to parse recentStations`, e)
          window.localStorage.setItem('recentStations', '')
          setRecentStations(null)
        }
      }
    }

    const getCurrentPosition = () => {
      if (typeof window !== 'undefined') {
        window.navigator.geolocation.getCurrentPosition(
          (position) => handleGeolocationSuccess(position.coords),
          (err) => err,
          { timeout: 15000, maximumAge: 60000 },
        )
      }
    }

    if (stationList.length && 'geolocation' in window.navigator) {
      getCurrentPosition()
    }
  }, [])

  return (
    <div>
      <Header>Select a BART Station</Header>
      {closestStation.name && (
        <div>
          <Subheader>Closest Station</Subheader>
          <li>
            <Link href={`/station?key=${closestStation.abbr}`}>
              <div>{closestStation.name}</div>
            </Link>
          </li>
        </div>
      )}
      {recentStations && recentStations.length && (
        <ul>
          <Subheader>Recent Stations</Subheader>
          {recentStations.map((station) => {
            if (!station) return null
            const abbr = Object.keys(station)[0]
            const name = Object.values(station)[0]
            return (
              <li key={abbr}>
                <Link href={`/station?key=${abbr}`}>
                  <div>{name}</div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      <Subheader>All Stations</Subheader>
      <ul>
        {stationList.length ? (
          stationList.map((station, index) => (
            <li key={index}>
              <Link href={`/station?key=${station.abbr}`}>
                <div>{station.name}</div>
              </Link>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </div>
  )
}
