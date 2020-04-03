import { APIResponse, Method } from '../types/apiResponse.type'
import { Encounter } from '../types/encounter.type'

class API {
  private baseURL: string
  // TODO Get this base URL from environment variables
  constructor(baseURL = 'http://localhost:8000') {
    this.baseURL = baseURL
  }

  public getEncounter(id: string): Promise<APIResponse<Encounter>> {
    return this.__request<APIResponse<Encounter>>(
      'GET',
      `${this.baseURL}/v1/encounters/${id}`
    )
  }

  public getEncounters(): Promise<APIResponse<Encounter[]>> {
    return this.__request<APIResponse<Encounter[]>>(
      'GET',
      `${this.baseURL}/v1/encounters`
    )
  }

  public createEncounter(body: object): Promise<APIResponse<Encounter>> {
    return this.__request<APIResponse<Encounter>>(
      'POST',
      `${this.baseURL}/v1/encounters`,
      body
    )
  }

  public updateEncounter(
    id: string,
    body: object
  ): Promise<APIResponse<Encounter>> {
    return this.__request<APIResponse<Encounter>>(
      'PUT',
      `${this.baseURL}/v1/encounters/${id}`,
      body
    )
  }

  private async __request<T>(
    method: Method = 'GET',
    endpoint = '',
    rawBody?: object | string,
    optionalHeaders = {}
  ): Promise<T> {
    const body = typeof rawBody === 'object' ? JSON.stringify(rawBody) : rawBody
    const headers = Object.assign(
      { 'Content-Type': 'application/json' },
      optionalHeaders
    )

    const response = await fetch(endpoint, {
      method,
      body,
      headers
    })

    const json = await response.json()
    if (!response.ok) {
      throw new Error(await json.error)
    }

    return json
  }
}

export default new API()
