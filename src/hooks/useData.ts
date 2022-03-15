import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { API_ENDPOINT } from '../constants';

export const useData = (
  path: string,
  pathId: string | undefined | string[],
) => {
  return useSWR(`${API_ENDPOINT}${path}${pathId}`, fetcher);
};
