import { Api, baseUrl } from '..'

export interface GetObservationResponse {
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

export const getObservation = async () => {
  const username = 'admin'
  const password = 'admin'
  const basicAuth = 'Basic ' + btoa(`${username}:${password}`)

  try {
    const res = await Api<GetObservationResponse>(
      `${baseUrl}/Datastreams(3)/Observations?$orderby=phenomenonTime desc&$top=1`,
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
