export interface UserResponse {
  success: boolean;
  meta: Meta;
  data: User[];
  code: number;
  message: string;
}

export interface Meta {
  totalData: number;
  totalDataOnPage: number;
  page: number;
  totalPage: number;
}

export interface User {
  email: string;
  phone?: string;
  userMeta: UserMeta;
  roles: string[];
  apps: string[];
  isActive: boolean;
  modifiedAt: string;
  userId: string;
  createdAt: string;
  companyName?: string;
  phoneKoja: string;
  name?: string;
  isDeleted?: boolean;
  avatar?: string;
}

export interface UserMeta {
  companyId?: string;
  phone?: string;
  deviceId?: string;
  webDeviceId?: string;
}

export interface UserRequest {
  isActive?: boolean;
  role?: string[];
  page?: number;
  limit?: number;
  sort?: number;
}

export interface UserUpdateRequest {
  userId: string;
  phone: string;
  isActive: boolean;
}

export interface UserUpdateResponse {
  success: boolean;
  data: UpdateData;
  message: string;
  code: number;
  statusCode: string;
}

export interface UpdateData {
  userId: string;
  email: string;
  name: string;
  avatar: string;
  userMeta: UserMeta;
}
