import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router'

import {auth} from '~/fire'

export class JoinTrip extends React.Component {
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user =>
      user
        ? joinTrip(user, this.props.inviteId)
            .then((info) => this.props.history.push(`/${info.data.tripId}`))
            .catch(alert)
        : this.props.login()
    )
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  render() {
    return 'Joining trip...'
  }
}

export default withRouter(JoinTrip)

function joinTrip(user, inviteId, props) {
  const JOIN_API = `/api/join/${inviteId}`
  return user.getIdToken().then(token =>
    axios.get(JOIN_API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
}
