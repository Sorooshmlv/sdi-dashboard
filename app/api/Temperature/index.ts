import { Api, baseUrl } from '..'

export interface GetTemperatureResponse {
  value: Value[]
  '@iot.nextLink': string
}

export interface Value {
  '@iot.selfLink': string
  '@iot.id': number
  phenomenonTime: string
  resultTime: string | null
  result: number
  'Datastream@iot.navigationLink': string
  'FeatureOfInterest@iot.navigationLink': string
}

export const getTemperature = async (id: number) => {
  const username = 'admin'
  const password = 'admin'
  const basicAuth = 'Basic ' + btoa(`${username}:${password}`)

  try {
    const res = await Api<GetTemperatureResponse>(
      `${baseUrl}/Datastreams(${id})/Observations?$orderby=phenomenonTime desc&$top=1`,
      {
        headers: {
          Authorization: basicAuth
        }
      }
    )

    const result = res.data.value[0]?.result

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
