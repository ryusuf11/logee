import * as fetch from '@/shared/fetcher';
import getConfig from 'next/config';
import { LoginError, LoginRequest, LoginResponse } from './loginEntity';

export const loginUser = async (payload: LoginRequest) => {
  try {
    const { publicRuntimeConfig } = getConfig();
    const response = await fetch.post<string, LoginResponse>(
      '/trans/user/v1/port-admin/login',
      JSON.stringify(payload),
      {
        headers: new Headers({
          Authorization: publicRuntimeConfig.basicToken,
          'Content-type': 'application/json; charset=UTF-8',
        }),
      },
    );
    return response;
  } catch (errorData) {
    throw errorData as LoginError;
  }
};
