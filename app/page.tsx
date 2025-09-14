'use client'

import useSwr from 'swr'
import { getTemperature } from './api/Temperature'
import { getHumidity } from './api/Humidity'
import { getLight } from './api/Light'
import { getGas } from './api/Gas'
import { getLocation } from './api/location'

export default function Home() {
  // location
  const { data: location } = useSwr('location', () => getLocation())

  // Temperature
  const { data: temp1 } = useSwr('Temperature1/3', () => getTemperature(3))
  const { data: temp2 } = useSwr('Temperature2/5', () => getTemperature(5))

  // Humidity
  const { data: hum1 } = useSwr('Humidity1/4', () => getHumidity(4))
  const { data: hum2 } = useSwr('Humidity2/6', () => getHumidity(6))

  // Light
  const { data: light1 } = useSwr('Light1/7', () => getLight(7))
  const { data: light2 } = useSwr('Light2/9', () => getLight(9))

  // Gas
  const { data: gas1 } = useSwr('Gas1/8', () => getGas(8))
  const { data: gas2 } = useSwr('Gas2/10', () => getGas(10))

  const sensors = [
    {
      label: 'Temperature 1',
      data: temp1,
      unit: '°C',
      shadow: 'shadow-[0_0_15px_2px_rgba(255,0,0,0.7)]',
      text: 'text-[rgba(255,0,0,0.8)]'
    },
    {
      label: 'Temperature 2',
      data: temp2,
      unit: '°C',
      shadow: 'shadow-[0_0_15px_2px_rgba(0,0,255,0.7)]',
      text: 'text-[rgba(0,0,255,0.8)]'
    },
    {
      label: 'Humidity 1',
      data: hum1,
      unit: '%',
      shadow: 'shadow-[0_0_15px_2px_rgba(0,255,0,0.7)]',
      text: 'text-[rgba(0,255,0,0.8)]'
    },
    {
      label: 'Humidity 2',
      data: hum2,
      unit: '%',
      shadow: 'shadow-[0_0_15px_2px_rgba(255,165,0,0.7)]',
      text: 'text-[rgba(255,165,0,0.8)]'
    },
    {
      label: 'Light 1',
      data: light1,
      unit: 'lux',
      shadow: 'shadow-[0_0_15px_2px_rgba(255,20,147,0.7)]',
      text: 'text-[rgba(255,20,147,0.8)]'
    },
    {
      label: 'Light 2',
      data: light2,
      unit: 'lux',
      shadow: 'shadow-[0_0_15px_2px_rgba(0,255,255,0.7)]',
      text: 'text-[rgba(0,255,255,0.8)]'
    },
    {
      label: 'Gas 1',
      data: gas1,
      unit: 'ppm',
      shadow: 'shadow-[0_0_15px_2px_rgba(153,255,51,0.7)]',
      text: 'text-[rgba(153,255,51,0.8)]'
    },
    {
      label: 'Gas 2',
      data: gas2,
      unit: 'ppm',
      shadow: 'shadow-[0_0_15px_2px_rgba(255,255,0,0.7)]',
      text: 'text-[rgba(255,255,0,0.8)]'
    }
  ]

  return (
    <section className='w-full h-full flex justify-center items-center p-4 max-tablet:p-10'>
      <div className='w-full max-w-3xl grid grid-cols-2 gap-16 max-tablet:p-8'>
        {sensors.map(sensor => (
          <div
            key={sensor.label}
            className={`border border-gray-400/50 rounded-xl bg-[#141414] ${sensor.shadow} p-4 text-center flex flex-col gap-2`}
          >
            {sensor.data == null ? (
              <p>Loading...</p>
            ) : (
              <p className={`font-semibold ${sensor.text}`}>
                {sensor.label} :{' '}
                <span className='ps-3 text-base text-white'>
                  {sensor.data?.data} {sensor.unit}
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
        ))}
      </div>
    </section>
  )
}
