'use client'
import useSwr from 'swr'
import { getObservation } from './api/observation'
import { getLocation } from './api/location'
import { getHumidity } from './api/Humidity'

export default function Home() {
  const { data: temperature } = useSwr(['Observations/'], () =>
    getObservation()
  )
  const { data: location } = useSwr(['Locations/'], () => getLocation())
  const { data: humidity } = useSwr(['Humidity/'], () => getHumidity())

  return (
    <section className='w-full h-full flex flex-col gap-8 tablet:gap-10 justify-center items-center p-4'>
      <div className='w-full max-w-md border rounded-2xl bg-[#0e0e0e] shadow-[0_0_20px_3px_rgba(255,0,0,0.4)] p-6 text-center'>
        {temperature !== null ? (
          <p>Temperature: {temperature?.data}°C</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='w-full max-w-md border rounded-2xl bg-[#0e0e0e] shadow-[0_0_20px_3px_rgba(0,0,255,0.2)] p-6 text-center'>
        {humidity !== null ? (
          <p>Humidity: {humidity?.data}%</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className='w-full max-w-md border rounded-2xl bg-[#0e0e0e] shadow-[0_0_20px_3px_rgba(0,255,0,0.3)] p-6 text-center'>
        {location !== null ? (
          <p>
            {'Location: ' +
              '  ' +
              'X: ' +
              location?.data?.at(0) +
              '  ' +
              'Y: ' +
              location?.data?.at(1)}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  )
}
