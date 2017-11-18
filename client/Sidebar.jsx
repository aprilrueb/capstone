import React, { Component } from 'react';
import { db } from '../fire'


export default class Sidebar extends Component {
  constructor(){
    super();
    this.state = { showMenu: false }
  }

  render() {
    const showMenu = this.state.showMenu;
    const logout = this.props.logout;
    return (
      <div>
      {showMenu
      ? (
        <div style={{display: 'flex', flexDirection: 'column', width: '200px'}}>
            <button onClick={() => { this.setState({ showMenu: false }) }}> X </button>
            <button > Dashboard </button>
            <button onClick={logout} > Log Out </button>
            <div>
              <h3>Trips</h3>
              {/* loop over user's trips and display their names*/}
            </div>
        </div>
      )
      : (
        <div>
          <button onClick={() => { this.setState({ showMenu: true }) }}> + </button>
        </div>
      )}

      </div>
    )
  }
}
