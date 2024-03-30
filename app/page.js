import { Footer } from './components/footer'
import { Loading } from './components/loading'
import { StationList } from './components/station-list'

const getStationList = async () => {
  try {
    const response = await fetch('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y')
    const data = await response.json()
    return data?.root?.stations?.station
  } catch (e) {
    console.error('error in fetching in pages/index.js getStationList()', e)
    return []
  }
}

export default async function Page() {
  let stationList = await getStationList()

  return (
    <div className="container">
      {stationList?.length ? <StationList stationList={stationList} /> : <Loading />} <Footer />
    </div>
  )
}
