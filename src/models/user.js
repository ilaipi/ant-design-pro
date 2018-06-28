import { routerRedux } from 'dva/router';

import { query as queryUsers, queryCurrent, login, logout } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
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
      yield put({
        type: 'saveCurrentUser',
        payload: data,
      });
      yield put(routerRedux.push(data.homepage || '/requirement/baidu-spider'));
    },
    *logout(_, { call, put, select }) {
      try {
        yield call(logout);
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
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
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
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
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
