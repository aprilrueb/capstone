import React, { Component } from 'react';
// import {ui, uiConfig} from '../fire'


export const HomePage = ({login}) => {
  return (
    <div>
      <header>
        <button onClick={login}>Log In</button>
      </header>
      <div>
        <h1>Trip Planner</h1>
        <img src='' />
        <p>Trip Planner (working name) is an app that allows groups to coordinate trips seamlessly. The built-in real-time chat allows users to coordinate and the built-in chatbot lets the group look up things to do from within the app, pin items they're thinking about and add events to their itinerary. Our pinned section lets users like and comment on potential activities and locations before adding them to the app and our itinerary keeps the plan clear for everyone.</p>
        <ul>
        Special Features
          <li>Upload screenshots of your reservations and add them directly into the itineray via chatbot</li>
          <li>Add who paid what to each event and 'close out' at the end. Our app will put all the bills together and tell you who owes what to who, as simply as possible.</li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage;
