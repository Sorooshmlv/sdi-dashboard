'use client'
import useSwr from 'swr'
import { getTemperature } from './api/Temperature'
import { getLocation } from './api/Location'
import { getHumidity } from './api/Humidity'
import { getLight } from './api/Light'
import { getGas } from './api/Gas'

const sensors = [
  { label: 'Temperature 1', fetcher: getTemperature, id: 3, unit: '°C' },
  { label: 'Temperature 2', fetcher: getTemperature, id: 5, unit: '°C' },
  { label: 'Humidity 1', fetcher: getHumidity, id: 4, unit: '%' },
  { label: 'Humidity 2', fetcher: getHumidity, id: 6, unit: '%' },
  { label: 'Light 1', fetcher: getLight, id: 7, unit: 'lux' },
  { label: 'Light 2', fetcher: getLight, id: 9, unit: 'lux' },
  { label: 'Gas 1', fetcher: getGas, id: 8, unit: 'ppm' },
  { label: 'Gas 2', fetcher: getGas, id: 10, unit: 'ppm' }
]

const shadows = [
  'shadow-[0_0_15px_2px_rgba(255,0,0,0.4)]',
  'shadow-[0_0_15px_2px_rgba(0,0,255,0.4)]',
  'shadow-[0_0_15px_2px_rgba(0,255,0,0.4)]',
  'shadow-[0_0_15px_2px_rgba(255,165,0,0.4)]',
  'shadow-[0_0_15px_2px_rgba(255,20,147,0.4)]',
  'shadow-[0_0_15px_2px_rgba(0,255,255,0.4)]',
  'shadow-[0_0_15px_2px_rgba(255,0,255,0.4)]',
  'shadow-[0_0_15px_2px_rgba(255,255,0,0.4)]'
]
const text = [
  'text-[rgba(255,0,0,0.8)]',
  'text-[rgba(0,0,255,0.8)]',
  'text-[rgba(0,255,0,0.8)]',
  'text-[rgba(255,165,0,0.8)]',
  'text-[rgba(255,20,147,0.8)]',
  'text-[rgba(0,255,255,0.8)]',
  'text-[rgba(255,0,255,0.6)]',
  'text-[rgba(255,255,0,0.8)]'
]

export default function Home() {
  const { data: location } = useSwr(['Locations/'], () => getLocation())

  return (
    <section className='w-full h-full flex justify-center items-center max-tablet:p-10'>
      {/* مستطیل بزرگ شامل 8 سنسور */}
      <div className='w-full max-w-3xl grid grid-cols-2 gap-12 max-tablet:gap-4'>
        {sensors.map((sensor, idx) => {
          const { data } = useSwr([`${sensor.label}/${sensor.id}`], () =>
            sensor.fetcher(sensor.id)
          )

          return (
            <div
              key={sensor.label}
              className={`border border-gray-400/50 rounded-xl bg-[#141414] ${shadows[idx]} p-4 text-center flex flex-col gap-2`}
            >
              {data == null ? (
                <p>Loading...</p>
              ) : (
                <>
                  <p
                    className={`font-semibold ${text[idx]} drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]`}
                  >
                    {sensor.label} :
                    <span className='ps-3 text-lg text-white'>
                      {data?.data} {sensor.unit}
                    </span>
                  </p>
                </>
              )}
              {location ? (
                <p className='text-sm text-gray-400'>
                  X: {location?.data?.at(0)} | Y: {location?.data?.at(1)}
                </p>
              ) : (
                <p className='text-sm text-gray-500'>Loading location...</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
