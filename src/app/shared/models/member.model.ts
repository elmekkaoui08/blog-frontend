import {UserModel} from './user.model';

export interface MemberModel{
  member_id: number
  user: UserModel
}
