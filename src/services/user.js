import { get } from '../utils/request';

export async function query() {
  return get('/api/users');
}

export async function queryCurrent() {
  return get('/api/currentUser');
}
