import * as fetch from '@/shared/fetcher';
import getConfig from 'next/config';
import { LoginError, LoginRequest, LoginResponse } from './loginEntity';

export const loginUser = async (payload: LoginRequest) => {
  try {
    const { publicRuntimeConfig } = getConfig();
    const response = await fetch.post<string, LoginResponse>(
      '/login/user/v1/port-admin/login',
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

export const getProfile = async () => {
  try {
    const response = await fetch.get<LoginResponse>(
      '/api/user/port-admin/v1/users',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmZWF0dXJlIjoiQkFTSUMiLCJhc3NpZ25JbmRpY2FyIjpmYWxzZSwic2hvd1RyYWNraW5nIjpmYWxzZSwiZW1haWwiOiJwb3J0LWFkbWluQHlvcG1haWwuY29tIiwidXNlcklkIjoiNDIwYmY1YWUtYmI1OS00M2M1LWI3ZjMtYTUzODY3ZGMwZDc3IiwibmFtZSI6IlBvcnQgV2ViIEFkbWluIiwiYXZhdGFyIjpudWxsLCJyb2xlcyI6WyJwb3J0LWFkbWluIl0sInBob25lIjoiIiwiZGV2aWNlSWQiOiIiLCJjb21wYW55Ijp7fSwiaWF0IjoxNjMzMDY5NzQyLCJleHAiOjE2MzU2NjE3NDIsImF1ZCI6Ijk3YjMzMTkzLTQzZmYtNGU1OC05MTI0LWIzYTliOWY3MmMzNCIsImlzcyI6InRlbGtvbWRldiJ9.nibgyxEz3VFB_wEf418RiZb4mEBjWPGFzGg13DiOsGDosMX9JovRcHsxi9PcBCXqaR5i-Yc1k_i_1_HA04-dLi4U6iF1KrBQB4a-bKBZuHPeshgIyLh-JUYfivOZ3BMLEQ9AFTVfwDyr6FOPk5rA4EX5RgvgioBYukrUooWHF5MeOAbEVABQ04MsdcaqulpOUUm0YfrN_8FYhpEMG7Qutc0roifrUYCxqDupweryb492BtRZ2zo_1QwbeemK3X8eKoYi31aIfceAHMGZjlU1bDBWTJuvILsRL0FqR32n06jOCw-aF_te-7brC28417WSlu9m01fpIJqd3VfyxTDE1Vkf3g-kQ57VtNvKkjbNFekojFvLC-2Akgdsvyzl89rP6lXyUCYe0xsCuVn2WCVcsfi0GOVU_0rExkcAWjOVv-53rdsywqYuy-vBxVg1PgUzL0NzUYHjpxhVHeomSVvH2nFs90-pfMF8vWcoS7wH2gO_hHEVsHgS24cGeV4Hg0SyUXBi1tFjmdMfiNEGJ-ojoQrDusqhic2fHHzvrrC3wZJVMFXlLrOUFqAXDHRHL0X04J3YQweYyZRyaoLOv5cuwOILrYdnG-JPIcLoypTVEOUQqmvsjkr2Vyv9P5budI-Ujm1kcVTXPBFhhm5G7UvFfvKeZTTYFrqYzm3a3D2OIqo',
          Accept: 'application/json',
        },
      },
    );
    console.log('respon', response);
    return response;
  } catch (errorMessage) {
    console.log(errorMessage);
    // return throwError(errorMessage as throwErrorProps);
  }
};
