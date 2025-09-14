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
    color: 'rgba(255,0,0,0.6)',
    shadow: 'rgba(255,0,0,0.4)'
  },
  {
    label: 'Temperature 2',
    fetcher: getTemperature,
    id: 5,
    unit: '°C',
    color: 'rgba(0,0,255,0.6)',
    shadow: 'rgba(0,0,255,0.4)'
  },
  {
    label: 'Humidity 1',
    fetcher: getHumidity,
    id: 4,
    unit: '%',
    color: 'rgba(0,255,0,0.6)',
    shadow: 'rgba(0,255,0,0.4)'
  },
  {
    label: 'Humidity 2',
    fetcher: getHumidity,
    id: 6,
    unit: '%',
    color: 'rgba(255,165,0,0.6)',
    shadow: 'rgba(255,165,0,0.4)'
  },
  {
    label: 'Light 1',
    fetcher: getLight,
    id: 7,
    unit: 'lux',
    color: 'rgba(255,20,147,0.6)',
    shadow: 'rgba(255,20,147,0.4)'
  },
  {
    label: 'Light 2',
    fetcher: getLight,
    id: 9,
    unit: 'lux',
    color: 'rgba(0,255,255,0.6)',
    shadow: 'rgba(0,255,255,0.4)'
  },
  {
    label: 'Gas 1',
    fetcher: getGas,
    id: 8,
    unit: 'ppm',
    color: 'rgba(255,255,0,0.6)',
    shadow: 'rgba(255,255,0,0.4)'
  },
  {
    label: 'Gas 2',
    fetcher: getGas,
    id: 10,
    unit: 'ppm',
    color: 'rgba(255,0,255,0.6)',
    shadow: 'rgba(255,0,255,0.4)'
  }
]

export default function Home() {
  // useSwr هر سنسور جداگانه بالا کامپوننت
  const temp1 = useSwr('temp1', () => getTemperature(3))
  const temp2 = useSwr('temp2', () => getTemperature(5))
  const hum1 = useSwr('hum1', () => getHumidity(4))
  const hum2 = useSwr('hum2', () => getHumidity(6))
  const light1 = useSwr('light1', () => getLight(7))
  const light2 = useSwr('light2', () => getLight(9))
  const gas1 = useSwr('gas1', () => getGas(8))
  const gas2 = useSwr('gas2', () => getGas(10))
  const location = useSwr('location', () => getLocation())

  const dataArr = [temp1, temp2, hum1, hum2, light1, light2, gas1, gas2]

  return (
    <section className='w-full h-full flex justify-center items-center max-tablet:p-10'>
      <div className='w-full max-w-3xl grid grid-cols-2 gap-12 max-tablet:gap-4'>
        {sensors.map((sensor, idx) => {
          const data = dataArr[idx].data
          return (
            <div
              key={sensor.label}
              className={`border border-gray-400/50 rounded-xl bg-[#141414] shadow-[0_0_15px_2px_${sensor.shadow}] p-4 text-center flex flex-col gap-2`}
            >
              {data == null ? (
                <p>Loading...</p>
              ) : (
                <p className='font-semibold' style={{ color: sensor.color }}>
                  {sensor.label}:{' '}
                  <span className='text-lg text-white'>
                    {data?.data} {sensor.unit}
                  </span>
                </p>
              )}
              {location.data ? (
                <p className='text-sm text-gray-400'>
                  X: {location.data?.data?.at(0)} | Y:{' '}
                  {location.data?.data?.at(1)}
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
