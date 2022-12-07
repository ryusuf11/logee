export interface LoginResponse {
  success: boolean;
  data: LoginData;
  message: string;
  code: number;
  statusCode: string;
}

export interface LoginData {
  feature: string;
  email: string;
  userId: string;
  name: string;
  avatar: any;
  roles: string[];
  phone: string;
  deviceId: string;
  company: {};
  accessToken: string;
  exp: number;
}

export interface LoginError {
  success: boolean;
  data: string;
  message: string;
  code: number;
  statusCode: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
