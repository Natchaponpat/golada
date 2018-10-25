export const MAIN_INIT = 'main/init'
export const mainInit = () => ({
  type: MAIN_INIT,
  loading: true,
})

export const MAIN_DONE = 'main/done'
export const mainDone = (data = {}) => ({
  type: MAIN_DONE,
  loading: false,
  ...data,
})


export const MAIN_ERROR = 'main/error'
export const mainError = (data = {}) => ({
  type: mainError,
  loading: false,
...data
})


