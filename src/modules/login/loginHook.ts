import { useMutation, UseMutationOptions } from 'react-query';
import { LoginError, LoginRequest, LoginResponse } from './loginEntity';
import { loginUser } from './loginService';

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, LoginError, LoginRequest>,
) => {
  return useMutation(
    ['login'],
    (payload: LoginRequest) => loginUser(payload),
    options,
  );
};
