export type RoleType = 'admin' | 'manager' | 'user';

interface IPermission {
  id: number;
  name: string;
  key: string;
  resource: string;
  action: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissionCount: number;
  permissions: IPermission[];
  createdAt: Date;
  updatedAt: Date;
}
