import {Map} from './'

const MapWrapper = ({currRegion}) => {

  return (
    <main className='flex-1'>
        <Map currRegion={currRegion} />
    </main>
  )
}

export default MapWrapper