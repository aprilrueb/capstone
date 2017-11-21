import React, { Component } from 'react'

export default class Event extends Component {
    constructor(){
        super();
        this.handleLike = this.handleLike.bind(this);
    }

    handleLike(evt){
        evt.preventDefault();
        const eventRef = this.props.room.doc(this.props.eventId);
        const likes = this.props.room.doc(this.props.eventId).likes || {counter: 0} ;
        const userBefore = likes[this.props.userId] || false
        console.log('handling like', likes, userBefore)
        if (!userBefore){
            console.log('attempting to set')
            eventRef.set({ likes: Object.assign({}, likes, { [this.props.userId]: !userBefore, counter: likes.counter++ }) }, { merge: true });
        } else {
            eventRef.set({ likes: Object.assign({}, likes, { [this.props.userId]: !userBefore, counter: likes.counter-- }) }, { merge: true });
        }

    }

    render() {
        const isItin = this.props.itineraryStatus;
        console.log('this.props is: ', this.props)
        return (
            isItin
            ?
            <div className="event">
                <li>{`${this.props.name} @ ${this.props.time.toLocaleTimeString()}`}</li>

            </div>
            :
            <div className="event pin-event">
                <span className="yellow badge" onClick={this.handleLike}>{this.props.likes ? this.props.likes.counter : 0 } &hearts;</span>
                <p>{this.props.name}</p>
                <p>{this.props.description}</p>

            </div>

        )
    }
}


// <p>date {props.data.time.toDateString && props.data.time.toDateString()}</p>
