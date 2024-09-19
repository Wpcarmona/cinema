export interface AuthResponse {
  header: AuthHeader[];
  body: AuthUser[];
}

export interface AuthHeader {
  error: string;
  code: number;
  token: string;
}

export interface AuthUser {
  name: string;
  phone: string;
  email: string;
  img: string;
  role: string;
  state: boolean;
  firstName: string;
  uid: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface LogoutResponse {
  header: HeadersLogout[];
  body: EmptyBody[];
}

export interface HeadersLogout {
  error: string;
  code: number;
  message: string;
}

export interface EmptyBody {}

export interface User {
  name: string;
  phone: string;
  email: string;
  img: string;
  role: string;
  state: boolean;
  firstName: string;
  uid: string;
}

export interface UsersResponse {
  header: {
    error: string;
    code: number;
  }[];
  body: {
    total: number;
    users: User[];
  }[];
}

export interface User {
  name: string;
  phone: string;
  email: string;
  img: string;
  role: string;
  state: boolean;
  firstName: string;
  uid: string;
}

export interface UserResponse {
  header: {
    error: string;
    code: number;
  }[];
  body: {
    usuario: User;
  }[];
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface UserUpdateResponse {
  header: [
    {
      error: string;
      code: number;
    }
  ];
  body: [
    {
      msg: string;
      user: User;
    }
  ];
}

export interface User {
  name: string;
  phone: string;
  email: string;
  img: string;
  role: string;
  state: boolean;
  firstName: string;
  uid: string;
}

export interface UserDeleteResponse {
  header: [
    {
      error: string;
      code: number;
    }
  ];
  body: [
    {
      msg: string;
      usuario: User;
    }
  ];
}

export interface User {
  name: string;
  phone: string;
  email: string;
  img: string;
  role: string;
  state: boolean;
  firstName: string;
  uid: string;
}
