'use client'

import useSwr from 'swr'
import { getTemperature } from './api/Temperature'
import { getHumidity } from './api/Humidity'
import { getLight } from './api/Light'
import { getGas } from './api/Gas'
import { getLocation } from './api/location'

const sensors = [
  {
    label: 'Temperature 1',
    fetcher: getTemperature,
    id: 3,
    unit: '°C',
    shadow: 'shadow-[0_0_15px_2px_rgba(255,0,0,0.7)]',
    text: 'text-[rgba(255,0,0,0.8)]'
  },
  {
    label: 'Temperature 2',
    fetcher: getTemperature,
    id: 5,
    unit: '°C',
    shadow: 'shadow-[0_0_15px_2px_rgba(0,0,255,0.7)]',
    text: 'text-[rgba(0,0,255,0.8)]'
  },
  {
    label: 'Humidity 1',
    fetcher: getHumidity,
    id: 4,
    unit: '%',
    shadow: 'shadow-[0_0_15px_2px_rgba(0,255,0,0.7)]',
    text: 'text-[rgba(0,255,0,0.8)]'
  },
  {
    label: 'Humidity 2',
    fetcher: getHumidity,
    id: 6,
    unit: '%',
    shadow: 'shadow-[0_0_15px_2px_rgba(255,165,0,0.7)]',
    text: 'text-[rgba(255,165,0,0.8)]'
  },
  {
    label: 'Light 1',
    fetcher: getLight,
    id: 7,
    unit: 'lux',
    shadow: 'shadow-[0_0_15px_2px_rgba(255,20,147,0.7)]',
    text: 'text-[rgba(255,20,147,0.8)]'
  },
  {
    label: 'Light 2',
    fetcher: getLight,
    id: 9,
    unit: 'lux',
    shadow: 'shadow-[0_0_15px_2px_rgba(0,255,255,0.7)]',
    text: 'text-[rgba(0,255,255,0.8)]'
  },
  {
    label: 'Gas 1',
    fetcher: getGas,
    id: 8,
    unit: 'ppm',
    shadow: 'shadow-[0_0_15px_2px_rgba(153,255,51,0.7)]',
    text: 'text-[rgba(153,255,51,0.8)]'
  },
  {
    label: 'Gas 2',
    fetcher: getGas,
    id: 10,
    unit: 'ppm',
    shadow: 'shadow-[0_0_15px_2px_rgba(255,255,0,0.7)]',
    text: 'text-[rgba(255,255,0,0.8)]'
  }
]

export default function Home() {
  const { data: location } = useSwr(['location'], () => getLocation())

  return (
    <section className='w-full h-full flex justify-center items-center p-4 max-tablet:p-10'>
      <div className='w-full max-w-3xl grid grid-cols-2 gap-12 max-tablet:gap-6'>
        {sensors.map(sensor => {
          const { data } = useSwr([`${sensor.label}/${sensor.id}`], () =>
            sensor.fetcher(sensor.id)
          )

          return (
            <div
              key={sensor.label}
              className={`border border-gray-400/50 rounded-xl bg-[#141414] ${sensor.shadow} p-4 text-center flex flex-col gap-2`}
            >
              {data == null ? (
                <p>Loading...</p>
              ) : (
                <p className={`font-semibold ${sensor.text}`}>
                  {sensor.label} :{' '}
                  <span className='ps-3 text-lg text-white'>
                    {data?.data} {sensor.unit}
                  </span>
                </p>
              )}
              {location ? (
                <p className='text-sm text-gray-400'>
                  X: {location.data?.at(0)} | Y: {location.data?.at(1)}
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
