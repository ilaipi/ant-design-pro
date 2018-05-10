import { post, get } from '../utils/request';

export async function queryProjectNotice() {
  return get('/api/project/notice');
}

export async function queryActivities() {
  return get('/api/activities');
}

export async function queryRule(params) {
  return get('/api/rule', { params });
}

export async function removeRule(params) {
  return post('/api/rule', {
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return post('/api/rule', {
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return post('/api/forms', {
    data: params,
  });
}

export async function fakeChartData() {
  return get('/api/fake_chart_data');
}

export async function queryTags() {
  return get('/api/tags');
}

export async function queryBasicProfile() {
  return get('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return get('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return get('/api/fake_list', { params });
}

export async function fakeAccountLogin(params) {
  return post('/api/login/account', {
    data: params,
  });
}

export async function fakeRegister(params) {
  return post('/api/register', {
    data: params,
  });
}

export async function queryNotices() {
  return get('/api/notices');
}
