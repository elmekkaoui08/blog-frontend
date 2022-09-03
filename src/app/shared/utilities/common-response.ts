
export interface CommonResponse<T>{
  count: number,
  next: string,
  previous: string,
  results: T[]
}
