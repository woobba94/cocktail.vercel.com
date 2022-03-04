import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';
import { API_ENDPOINT } from '../constants';

export const useData = (
  path: string,
  pathId: string | undefined | string[],
) => {
  // console.log(`${API_ENDPOINT}${path}${pathId}`);
  // pathId 는 / 로 시작
  return useSWR(`${API_ENDPOINT}${path}${pathId}`, fetcher);
};
