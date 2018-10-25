const mainState = {
  loading: false,
  error: '',
}

export default (state = mainState, action) => {
  const { type, ...rest } = action

  console.log('type..', type)
  if (type.startsWith('main/')) {
    return Object.assign({}, state, rest)
  }

  return state
}
