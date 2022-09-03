import {UserModel} from './user.model';

export interface AdminModel{
  admin_id: number
  user: UserModel
}
