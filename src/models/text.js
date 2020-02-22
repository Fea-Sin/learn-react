
const TestModal = {
  namespace: 'test',

  state: {
    exampleA: '000',
    exampleB: {
      userEmail: '456@qq.com',
      userID: '456',
    }
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
    },
    setTB(state, { payload }) {
      return {
        ...state,
        exampleB: payload,
      }
    },
  }
}

export default TestModal;