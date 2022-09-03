import {CountryModel} from './country.model';

export interface CityModel{
  city_id: number
  city_name: string
  country: CountryModel
}
