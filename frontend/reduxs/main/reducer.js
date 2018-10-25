const channelState = {
  loading: false,
  error: '',
}

export default (state = channelState, action) => {
  const { type, ...rest } = action

  if (type.startsWith('channel/')) {
    return Object.assign({}, state, rest)
  }

  return state
}
