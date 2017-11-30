import React, { Component } from 'react'

export default class Event extends Component {
    constructor(props){
        super(props);
        this.state = {}
        this.handleLike = this.handleLike.bind(this);
    }

    handleLike (evt){
        evt.preventDefault();
        const eventRef = this.props.room.doc(this.props.eventId)
        const {likes={}} = this.props
        eventRef.update({
            [`likes.${this.props.userId}`]: !likes[this.props.userId]
        })
    }


    render() {
        const isItin = this.props.itineraryStatus;
        return (
            isItin
            ?
                <li className="itin-event">{`${this.props.name} @ ${this.props.time.toLocaleTimeString()}`}</li>
            :
            <div className="pin-event">
                <span className={`badge ${this.props.likes && this.props.likes[this.props.userId] && 'liked' }`} onClick={this.handleLike}>{count(this.props.likes)} &hearts;</span>
                <p><b>{this.props.name}</b></p>
                <p>{this.props.description}</p>
            </div>
        )
    }
}


function count(likes) {
    if (!likes) return 0
    return Object.keys(likes).reduce((num, uid) => (num + (likes[uid] ? 1 : 0)), 0)
}

