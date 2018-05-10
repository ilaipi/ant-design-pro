import { get } from '../utils/request';

export async function query(code) {
  return get(`/api/${code}`);
}
