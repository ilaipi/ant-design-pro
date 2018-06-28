import { routerRedux } from 'dva/router';

import { query as queryUsers, login, logout } from '../services/user';
import { COOKIE_KEY, AUTH_INFO } from './../common/consts';
import { setCookie } from './../utils/cookie';

export default {
  namespace: 'user',

  state: {
    list: [],
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(login, payload);
      if (!data) return;
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'authed',
        },
      });
      // 登录后设置Cookie，用户信息放进localStorage
      setCookie(COOKIE_KEY, data.id, 1);
      window.localStorage.setItem(AUTH_INFO, JSON.stringify(data));
      yield put(routerRedux.push(data.homepage || '/pthx/signup'));
    },
    *logout(_, { call, put, select }) {
      try {
        yield call(logout);
        // delete cookie
        // remove localStorage
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
          },
        });
        yield put(routerRedux.push('/user/login'));
      }
    },
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
