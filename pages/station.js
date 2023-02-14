import { useEffect, useState } from 'react';
import SelectedStation from '../components/selected-station';
import stationPlatformFormatter from '../helpers/station-platform-formatter';

export default function Station({ selectedStation = {}, stationAbbr, stationName }) {
  return <SelectedStation selectedStation={selectedStation} stationAbbr={stationAbbr} stationName={stationName} />;
}

export async function getServerSideProps({ query }) {
  const { key } = query;
  if (!key) {
    return { selectedStation: {}, stationAbbr: '', stationName: '' };
  } else {
    try {
      const response = await fetch(
        `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${key}&key=MW9S-E7SL-26DU-VV8V&json=y`,
      );
      const data = await response.json();
      const { etd: destinations, name } = data.root.station[0];
      const formattedStationInfo = stationPlatformFormatter(destinations);
      return { props: { selectedStation: formattedStationInfo, stationAbbr: key, stationName: name } };
    } catch (e) {
      console.error('error in fetching in pages/station.js getServerSideProps()', e);
      return { props: { selectedStation: {}, stationAbbr: '', stationName: '' } };
    }
  }
}
