import { useEffect, useState } from 'react';
import fetch from 'node-fetch';

import { Destination } from '../destination';
import { Header } from '../header';
import { Subheader } from '../subheader';
import currentTimeStringFormatter from '../../helpers/current-time-string-formatter';
import stationPlatformFormatter from '../../helpers/station-platform-formatter';
import styles from '../../styles/Home.module.css';

export default function SelectedStation({ selectedStation = {}, stationAbbr, stationName }) {
  console.info({ selectedStation });
  const [lastUpdated, setLastUpdated] = useState(currentTimeStringFormatter());
  const [platforms, setPlatforms] = useState(selectedStation);
  const hasStationInformation = !!platforms[1] || !!platforms[2];

  useEffect(() => {
    const fetchStationInfo = async () => {
      if (stationAbbr) {
        const response = await fetch(
          `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationAbbr}&key=MW9S-E7SL-26DU-VV8V&json=y`,
        );
        const data = await response.json();
        const { etd: destinations } = data?.root?.station[0];
        const formattedStationInfo = stationPlatformFormatter(destinations);
        setPlatforms(formattedStationInfo);
        setLastUpdated(currentTimeStringFormatter());
      }
    };
    fetchStationInfo();
    const interval = setInterval(() => fetchStationInfo(), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header shouldShowBack updatedTime={lastUpdated}>
        {stationName && stationName}
      </Header>
      <div>
        {hasStationInformation &&
          Object.entries(platforms).map(([platformNumber, destinations]) => (
            <div key={platformNumber}>
              <Subheader>{`Platform ${platformNumber}`}</Subheader>
              {destinations.length &&
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
