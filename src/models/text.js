
const TestModal = {
  namespace: 'test',

  state: {
    exampleA: '000'
  },
  
  effects: {
    *fetchTA(_, { call, put }) {
      const response = yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('111')
        }, 1000)
      })

      yield put({
        type: 'saveTA',
        payload: response,
      })
    }
  },

  reducers: {
    saveTA(state, { payload }) {
      return {
        ...state,
        exampleA: payload,
      }
    }
  }
}

export default TestModal;