/* --- ROlE ---  */

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

/* --- USER ---  */
export interface CreateUserParams {
  newUser: {
    firstName: string;
    lastName?: string;
    username: string;
    email: string;
    role: number;
    isActive: boolean;
  };
}

export interface GetUserById {
  id: number;
}

export interface UpdateUserParams {
  id: number;
  updatedUser: {
    firstName: string;
    lastName?: string;
    username: string;
    email: string;
    role: number;
    isActive: boolean;
  };
}
