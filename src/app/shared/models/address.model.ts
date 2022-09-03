import {CityModel} from './city.model';
import {UserModel} from './user.model';

export interface AddressModel{
  address_id: number
  is_primary: boolean
  province: string
  street: string
  city: CityModel
  user: UserModel
}
