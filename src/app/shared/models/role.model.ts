export enum AppRoles{
  ADMIN= 'ADMIN',
  AUTHOR = 'AUTHOR',
  MEMBER = 'MEMBER'
}
export interface RoleModel{
  role_id: number
  role_name: string
}
