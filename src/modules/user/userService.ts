import { getCookie } from 'cookies-next';
import * as fetch from '@/shared/fetcher';
import {
  UserRequest,
  UserResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from './userEntity';

export const getUserList = async (payload: UserRequest) => {
  try {
    const token = getCookie('token');
    const params = new URLSearchParams({
      page: payload.page?.toString() || '1',
      isActive: payload.isActive?.toString() || 'true',
      limit: payload.limit?.toString() || '10',
      sort: payload.sort?.toString() || '-1',
    });

    payload.role?.forEach((role) => {
      params.append('role[]', role);
    });

    const response = await fetch.get<UserResponse>(
      `/eco/port-admin/v1/users?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  } catch (errorData) {
    throw errorData;
  }
};

export const updateUser = async (payload: UserUpdateRequest) => {
  try {
    const token = getCookie('token');
    const response = await fetch.put<string, UserUpdateResponse>(
      '/trans/user/v1/admin/update-profile',
      JSON.stringify(payload),
      {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=UTF-8',
        }),
      },
    );
    return response;
  } catch (errorData) {
    throw errorData;
  }
};
