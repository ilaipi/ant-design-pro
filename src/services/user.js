import { get } from '../utils/request';

export async function query() {
  return get('/api/users');
}

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
