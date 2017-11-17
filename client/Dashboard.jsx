import React, { Component } from 'react';
// import {ui, uiConfig} from '../fire'
import {Sidebar} from './index'


export const Dashboard = ({ logout }) => {
  return (
    <div>
      <div>
        <Sidebar logout={logout} />
      </div>
      <h1>User Dashboard</h1>
    </div>
  )
}

export default Dashboard
