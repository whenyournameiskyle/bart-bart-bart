import SelectedStation from './page.client.js'
import stationPlatformFormatter from '../../helpers/station-platform-formatter'

export async function generateMetadata({ params }) {
  const stationAbbr = params.key
  const response = await fetch(`https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationAbbr}&key=MW9S-E7SL-26DU-VV8V&json=y`)
  const data = await response.json()
  const stationName = data?.root?.station[0]?.name

  return {
    title: `${stationName ? `${stationName} Station ` : ''}BART Times`,
    description: `Bay Area Rapid Transit (BART) times ${stationName ? ` for ${stationName} Station` : ''}`,
    keywords: `Bay Area Rapid Transit, BART, Bay Area Rapid Transit times, BART train times, san francisco train times, berkeley train times, oakland train times, BART webapp, BART browswer app, ${stationName} Station, ${stationName}`,
    language: 'English',
  }
}

export default async function Page({ params }) {
  async function fetchStationData() {
    'use server'
    const stationAbbr = params.key
    const response = await fetch(`https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationAbbr}&key=MW9S-E7SL-26DU-VV8V&json=y`)
    const data = await response.json()
    const { etd: destinations } = data?.root?.station[0]
    const platforms = stationPlatformFormatter(destinations)
    const stationName = data?.root?.station[0]?.name
    return { platforms, stationName }
  }

  return <SelectedStation fetchStationData={fetchStationData} stationAbbr={params.key} />
}
