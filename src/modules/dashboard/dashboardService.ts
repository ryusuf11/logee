import * as fetch from '@/shared/fetcher';
import { getBaseUrl } from '@/shared/utils';
import { GetServerSidePropsContext } from 'next';
import { DashboardResponse, DashboardRequest } from './dashboardEntity';

export const getReport = async (
  ctx: GetServerSidePropsContext,
  payload: DashboardRequest,
) => {
  try {
    const token = ctx.req.cookies.token || '';
    const baseUrl = getBaseUrl(ctx.req.headers.referer || '');
    const params = new URLSearchParams({ ...payload }).toString();

    const response = await fetch.get<DashboardResponse>(
      `${baseUrl}/eco/port-admin/v1/dashboard/reports?${params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  } catch (errorMessage) {
    throw errorMessage;
  }
};
