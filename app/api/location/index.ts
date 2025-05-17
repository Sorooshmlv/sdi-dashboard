import { Api, baseUrl } from '..'

export interface GetLocationResponse {
  value: Value[]
}

export interface Value {
  iotSelfLink: string
  iotID: number
  name: string
  description: string
  encodingType: string
  location: Location
  historicalLocationsIotNavigationLink: string
  thingsIotNavigationLink: string
}

export interface Location {
  type: string
  coordinates: number[]
}

export const getLocation = async () => {
  const username = 'admin'
  const password = 'admin'
  const basicAuth = 'Basic ' + btoa(`${username}:${password}`)

  try {
    const res = await Api<GetLocationResponse>(`${baseUrl}/Locations`, {
      headers: {
        Authorization: basicAuth
      }
    })

    const result = res.data.value[0]?.location.coordinates

    return {
      data: result,
      error: false
    }
  } catch {
    return {
      data: null,
      error: true
    }
  }
}
