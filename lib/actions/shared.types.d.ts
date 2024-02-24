export interface CreateRoleParams {
  rolename: string;
  rolePremissions?: number[];
}

export interface GetRolesParams {}

export interface GetRoleDataById {
  id: number;
}

export interface UpdateRoleParams {
  id: number;
  rolename: string;
  rolePremissions?: number[];
}
