import Trip from './client/Trip'

import {Switch, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import React, { Component } from 'react'
import { HomePage } from './client'
import firebase, { auth, provider, db } from '~/fire'
import Sidebar from './client/Sidebar';
import Dashboard from './client/Dashboard';
import JoinTrip from './client/JoinTrip'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = { user: null }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
        this.setState({ user })
    })
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        this.setState({ user })
        db.collection('users').doc(user.uid).set({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }, { merge: true });
      })
  }

  logout() {
    auth.signOut()
  }

  render(){

    const isLoggedIn = this.state.user;
    return (
      <Router>
        <div>
        <Route exact path="/join/:inviteId" render={
          ({ match: { params: { inviteId } } }) => <JoinTrip inviteId={inviteId} login={this.login} />
        } />

        {isLoggedIn ?
          (<div>
            <Sidebar logout={ this.logout } userId={this.state.user.uid} />
            <Switch>
            <Route exact path="/" render={(props) => <Dashboard user={this.state.user} {...props} />} /> {/* their acct dashboard */}
            <Route path="/:tripId" render={(props) => <Trip user={this.state.user} {...props} />} /> {/* an individual trip  */}
          </Switch>
          </div>
        )
        : (<Switch>
            <Route exact path="/" render={() => <HomePage login={this.login} />} /> {/* HomePage incl. login */}
          </Switch>)
        }
        </div>
      </Router>
    );
  }
}
