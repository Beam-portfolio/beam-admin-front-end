export interface IPermission {
  id: number;
  name: string;
  key: string;
  resource: string;
  action: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePermissionDto {
  name: string;
  key: string;
  resource: string;
  action: string;
  description?: string;
}

export interface UpdatePermissionDto extends Partial<CreatePermissionDto> {}
