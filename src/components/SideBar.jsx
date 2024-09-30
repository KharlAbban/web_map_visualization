import { districtsByRegion, regionalGeoCodes } from '../utils/key_geocodes'

const SideBar = ({currRegion, setCurrRegion}) => {

  return (
    <aside className='w-2/5 border-r-2 border-blue-500 py-2 px-1'>
        <h2 className="text-2xl font-semibold underline text-gray-900">SideBar Menu</h2>
        <p className='text-xs my-1 text-gray-500'>Select from any of the options below to see changes on the map</p>

        <div className="w-full flex h-full">
          <div className="w-1/2 px-1 py-2 border-r border-r-black">
            <h4 className="underline font-semibold text-lg">Regions</h4>
            {regionalGeoCodes.map((region, idx) => {
              return (
                <p key={region.regionName} onClick={() => setCurrRegion(region.regionName)} className={`w-max cursor-pointer mb-1 py-1 px-2 rounded hover:bg-gray-500 duration-200 ${currRegion === region.regionName ? "bg-gray-400" : ""}`}>{region.regionName}</p>
              )
            })}
          </div>
          <div className="w-1/2 ps-1 overflow-x-hidden overflow-y-auto">
            {currRegion != "" && <h4 className="underline font-semibold text-lg">{currRegion} Districts</h4>}
            <ul className='mb-6'>
              {districtsByRegion[currRegion]?.map((district, idx) => {
                return (
                  <li key={idx} className='mb-1 py-1 hover:bg-gray-400 flex items-center'>- {district}</li>
                )
              })}
            </ul>
          </div>
        </div>
    </aside>
  )
}

export default SideBar