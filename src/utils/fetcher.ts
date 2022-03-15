import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const arrayFetcher = (urlArr: []) => {
  const f = (u: string) => fetch(u).then((r) => r.json());
  return Promise.all(urlArr.map(f));
};
