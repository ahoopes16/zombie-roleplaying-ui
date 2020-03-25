export interface APIResponse<T> {
  result: T
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
