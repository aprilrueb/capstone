import React, { Component } from 'react';
import { db } from '../fire';
import {Link} from 'react-router-dom';

export default class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
        trips: []
    };
  }

  componentDidMount(){
    var tripsRef = db.collection('trips');
    var usersRef = tripsRef.where(`users.${this.props.user.uid}`, '==', true).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({trips: this.state.trips.concat({ [doc.data().name]: doc.id })});
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

  render(){
    var trips = this.state.trips;
    return (
      <div className="user-dashboard-whole-page">
      <div className="user-content flex-row-wrap">
      <img className="user-photo" src={this.props.user.photoURL} />
      <div className="user-text">
        <ul><h2>{this.props.user.displayName}</h2></ul>
        <div className="user-trips">{
            trips.map((trip, idx) => {
                return (
                    <h5 key={idx}>
                        <p><Link to={`/${Object.values(trip)[0]}`}>{Object.keys(trip)[0]}</Link></p>
                    </h5>
                );
            })
        }
        </div>
        </div>
        </div>
        </div>
    );
  }
}
