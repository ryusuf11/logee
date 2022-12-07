import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  UserRequest,
  UserResponse,
  UserUpdateRequest,
  UserUpdateResponse,
} from './userEntity';
import { getUserList, updateUser } from './userService';

export const useGetUserList = (
  payload: UserRequest,
  options?: UseQueryOptions<
    UserResponse,
    unknown,
    UserResponse,
    [string, UserRequest]
  >,
) => {
  return useQuery(['user-list', payload], () => getUserList(payload), {
    ...options,
    keepPreviousData: true,
  });
};

export const useUpdateUser = (
  options?: UseMutationOptions<UserUpdateResponse, unknown, UserUpdateRequest>,
) => {
  return useMutation(
    ['update-user'],
    (payload: UserUpdateRequest) => updateUser(payload),
    options,
  );
};
