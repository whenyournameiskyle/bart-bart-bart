import { useEffect, useState } from 'react';
import { getDistance } from 'geolib';
import Link from 'next/link';

import { Header } from '../header';
import { Subheader } from '../subheader';

export const StationList = ({ stationList = [] }) => {
  const [closestStation, setClosestStation] = useState({});
  const [recentStations, setRecentStations] = useState(null);

  const handleGeolocationSuccess = ({ latitude, longitude }) => {
    let currentClosestStation = stationList[0];
    if (!currentClosestStation.gtfs_latitude) return;
    let closestDistance = getDistance(
      {
        latitude: parseFloat(currentClosestStation.gtfs_latitude),
        longitude: parseFloat(currentClosestStation.gtfs_longitude),
      },
      { latitude, longitude },
    );

    for (let i = 1; i < stationList.length; i++) {
      const newDistance = getDistance(
        { latitude: parseFloat(stationList[i].gtfs_latitude), longitude: parseFloat(stationList[i].gtfs_longitude) },
        { latitude, longitude },
      );
      if (newDistance < closestDistance) {
        closestDistance = newDistance;
        currentClosestStation = stationList[i];
      }
    }
    setClosestStation(currentClosestStation);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const currentRecentStations = window.localStorage.getItem('recentStations') || null;
      if (currentRecentStations) {
        setRecentStations(currentRecentStations.split(','));
      }
    }

    const getCurrentPosition = () => {
      if (typeof window !== 'undefined') {
        window.navigator.geolocation.getCurrentPosition(
          (position) => handleGeolocationSuccess(position.coords),
          (err) => err,
          { timeout: 15000, maximumAge: 60000 },
        );
      }
    };

    if (stationList.length && 'geolocation' in window.navigator) {
      getCurrentPosition();
    }

    const interval = setInterval(() => getCurrentPosition(), 300000);
    return () => clearInterval(interval);
  }, []);

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
      {recentStations && (
        <ul>
          <Subheader>Recent Stations</Subheader>
          {recentStations.length &&
            recentStations.map((station, index) => {
              const stationInfoArray = station.split(':');
              if (stationInfoArray[0] === 'undefined' || stationInfoArray[1] === 'undefined') return null;
              return (
                <li key={index}>
                  <Link href={`/station?key=${stationInfoArray[0]}`} key={index}>
                    <div>{stationInfoArray[1]}</div>
                  </Link>
                </li>
              );
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
  );
};
