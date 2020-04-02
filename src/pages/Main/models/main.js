import { overall } from '@/services/Cov';
export default {
  namespace: 'main',
  state: {
    data: {},
  },
  effects: {
    *overall({ payload,callback }, { call, put }) {
      const response = yield call(overall, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      console.log(response.results[0]);
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
  }

};