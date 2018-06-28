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

export async function queryCurrent() {
  return {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    notifyCount: 12,
    privilege: {
      menus: ['/form/basic-form'],
    },
  };
  // return get('/api/currentUser');
}
