import { useEffect, useState } from 'react';
import { Destination } from '../destination';
import { Header } from '../header';
import { Subheader } from '../subheader';
import currentTimeStringFormatter from '../../helpers/current-time-string-formatter';
import stationPlatformFormatter from '../../helpers/station-platform-formatter';
import styles from '../../styles/Home.module.css';
import { logger } from '../../helpers/logtail.js';

export default function SelectedStation({ selectedStation = {}, stationAbbr, stationName }) {
  const [lastUpdated, setLastUpdated] = useState(currentTimeStringFormatter());
  const [platforms, setPlatforms] = useState(selectedStation);
  const hasStationInformation = !!platforms[1] || !!platforms[2];

  useEffect(() => {
    const fetchStationInfo = async () => {
      if (stationAbbr) {
        try {
          const response = await fetch(
            `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationAbbr}&key=MW9S-E7SL-26DU-VV8V&json=y`,
          );
          const data = await response.json();
          const { etd: destinations } = data?.root?.station[0];
          const formattedStationInfo = stationPlatformFormatter(destinations);
          setPlatforms(formattedStationInfo);
        } catch (e) {
          console.error('error in useEffect() fetchStationInfo()', e);
        }
        setLastUpdated(currentTimeStringFormatter());
      }
    };
    fetchStationInfo();
    const interval = setInterval(async () => await fetchStationInfo(), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logger) {
      logger.info(stationName, { stationAbbr, selectedStation });
    } else {
      console.info(stationName, stationAbbr, selectedStation);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let currentRecentStations = window.localStorage.getItem('recentStations') || null;
      const newStationObject = { [stationAbbr]: stationName };
      if (currentRecentStations) {
        if (currentRecentStations.includes(JSON.stringify(newStationObject))) {
          return;
        }
        currentRecentStations = JSON.parse(currentRecentStations);
        if (currentRecentStations.length >= 3) {
          currentRecentStations.shift();
        }
        currentRecentStations.push(newStationObject);
        window.localStorage.setItem('recentStations', JSON.stringify(currentRecentStations));
      } else {
        window.localStorage.setItem('recentStations', JSON.stringify([newStationObject]));
      }
    }
  }, [stationAbbr, stationName]);

  return (
    <div>
      <Header shouldShowBack>{(stationName && stationName) || stationAbbr}</Header>
      <div>
        {hasStationInformation &&
          Object.entries(platforms).map(([platformNumber, destinations]) => (
            <div key={platformNumber}>
              <Subheader>{`Platform ${platformNumber}`}</Subheader>
              {destinations &&
                destinations.length &&
                destinations.map((destination) => (
                  <Destination
                    key={destination.destinationName}
                    name={destination.destinationName}
                    trains={destination.trains}
                  />
                ))}
            </div>
          ))}
      </div>
      {lastUpdated && <div className={styles.timeText}>train times last updated at {lastUpdated}</div>}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y');
    const data = await response.json();
    return { props: { stationList: data?.root?.stations?.station } };
  } catch (e) {
    console.error('error in fetching in selected-station/index.js getServerSideProps()', e);
    return { props: { stationList: {} } };
  }
}
