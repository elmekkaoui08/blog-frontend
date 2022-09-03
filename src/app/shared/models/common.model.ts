export interface ApiData<T>{
  count: number
  next: string
  previous: string
  results: T[]
}
