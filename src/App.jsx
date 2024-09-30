import { useState } from 'react';
import { MapWrapper, SideBar } from './components'

const App = () => {
  const [currRegion, setCurrRegion] = useState("");

  return (
    <div className='bg-gray-200 h-full w-full'>
      <div className='border-4 border-blue-500 flex h-full'>
        <SideBar currRegion={currRegion} setCurrRegion={setCurrRegion} />
        <MapWrapper currRegion={currRegion} />
      </div>
    </div>
  )
}

export default App