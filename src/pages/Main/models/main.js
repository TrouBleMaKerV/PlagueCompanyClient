import { overall , news, rumors, charts} from '@/services/Cov';
export default {
  namespace: 'main',
  state: {
    data: {},
    news:[],
    rumors:[],
  },
  effects: {
    *overall({ payload,callback }, { call, put }) {
      const response = yield call(overall, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response.results[0]);
    },
    *news({ payload,callback }, { call, put }) {
      const response = yield call(news, payload);
      yield put({
        type: 'saveNews',
        payload: response,
      });
      if (callback) callback(response.results);
    },
    *rumors({ payload,callback }, { call, put }) {
      const response = yield call(rumors, payload);
      yield put({
        type: 'saveRumors',
        payload: response,
      });
      if (callback) callback(response.results);
    },
    *charts({ payload,callback }, { call, put }) {
      const response = yield call(charts, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        data: payload.results[0],
      };
    },
    saveNews(state, { payload }) {
      return {
        ...state,
        news: payload.results,
      };
    },
    saveRumors(state, { payload }) {
      return {
        ...state,
        rumors: payload.results,
      };
    },
  }

};