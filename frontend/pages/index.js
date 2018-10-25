// This is the Link API
import Link from 'next/link'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mainInit } from '../reduxs/main/action'
class Index extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(mainInit())
  }

  render() {
    const { msg, error } = this.props

    console.log('main render', msg, error)
    return (
      <div>
        <Link href="/about">
          <button>Go to About Page</button>
        </Link>
        {msg && <h1>{msg}</h1>}
      </div>
    )
  }
}

export default connect(
  state => state.main,
  dispatch => ({ dispatch }),
)(Index)
