import { chinaSummary, lineData, provinces } from '@/services/chinaData';

const ChinaModel = {
  namespace: 'chinaData',
  state: {
    china:{},
    provinces:[],
    line: []

  },
  effects: {
    *fetchChina(_, { call, put }) {
      const response = yield call(chinaSummary);
      yield put({
        type: 'saveChina',
        payload: response,
      });
    },

    *fetchProvinces(_, { call, put }) {
      const response = yield call(provinces);
      console.log('model/province')
      console.log(response)
      yield put({
        type: 'saveProvinces',
        payload: response,
      });
    },
    *fetchLine(_, { call, put }) {
      const response = yield call(lineData);
      yield put({
        type: 'saveLine',
        payload: response,
      });
    },
  },
  reducers: {
    saveChina(state, { payload }) {
      return { ...state, china: payload};
    },
    saveProvinces(state, { payload }) {
      return { ...state, provinces: payload};
    },
    saveLine(state, { payload }) {
      return { ...state, line: payload};
    },

  },
};
export default ChinaModel;
