import React, { Component } from 'react';
import { db } from '../fire'


export default class Sidebar extends Component {
  constructor(){
    super();
    this.state = { showMenu: false}
  }

  render() {
    const showMenu = this.state.showMenu;
    const logout = this.props.logout;
    return (
      <div>
      {showMenu
      ? (
        <div>
            <button onClick={() => { this.setState({ showMenu: false }) }}> X </button>
            <button onClick={logout} > Log Out</button>
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
