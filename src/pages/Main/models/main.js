import { overall , news, rumors, charts, foroeignCharts, fourDataInfo, world} from '@/services/Cov';
export default {
  namespace: 'main',
  state: {
    data: {},
    news:[],
    rumors:[],
    four:{},
    world:[]
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
    *world({ payload,callback }, { call, put }) {
      const response = yield call(world, payload);
      yield put({
        type: 'saveWorld',
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
    *foroeignCharts({ payload,callback }, { call, put }) {
      const response = yield call(foroeignCharts, payload);
      if (callback) callback(response);
    },
    *fourDataInfo({ payload,callback }, { call, put }) {
      console.log("aa");
      const response = yield call(fourDataInfo, payload);
      yield put({
        type: 'saveFour',
        payload: response,
      });
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
    saveFour(state, { payload }) {
      return {
        ...state,
        four: payload,
      };
    },
    saveWorld(state, { payload }) {
      return {
        ...state,
        world: payload,
      };
    },
  }

};