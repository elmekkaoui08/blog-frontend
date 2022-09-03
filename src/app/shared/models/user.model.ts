import {RoleModel} from './role.model';

export interface UserModel{
  id: number
  first_name: string
  last_name: string
  email: string
  date_of_birth: Date
  phone: string
  picture: any
  is_blocked: boolean
  role: RoleModel
}
