import { get, post } from '../utils/request';

export async function query() {
  return get('/api/users');
}

export const login = async data => {
  return post('/api/auth/login', data);
};

export const logout = async () => {
  return get('/api/auth/logout');
};
