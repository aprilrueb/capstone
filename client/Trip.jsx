import React, {Component} from 'react';
import { db } from '../fire'
import {Chat, Pinned, Itinerary} from './index'
import { Sidebar } from './Sidebar';


export default class Trip extends Component {

    constructor(props){
        super(props)
        this.state = {
            tripId: props.match.params.tripId,
            isPartOfTrip: true,
            startDate: {},
            endDate: {},
            name: '',
            showInvite: false,
            numOfUsers: 0
        }
        this.sendInvite = this.sendInvite.bind(this);
    }

    componentDidMount(){
        this.setState({ tripId: this.props.match.params.tripId})
        this.unsubscribe = db.collection('trips').doc(this.props.match.params.tripId)
            .onSnapshot((doc) => {
                this.setState({...doc.data(), numOfUsers: getTrue(doc.data().users), isPartOfTrip: true})
            });
    }

    componentWillReceiveProps(nextProps){
        this.setState({ tripId: nextProps.match.params.tripId })
        if(this.props !== nextProps) this.props = nextProps;
        this.unsubscribe && this.unsubscribe();
        this.unsubscribe = db.collection('trips').doc(nextProps.match.params.tripId)
            .onSnapshot((doc) => {
                this.setState({ ...doc.data(), numOfUsers: getTrue(doc.data().users), isPartOfTrip: true })
            });
    }


    sendInvite(evt){
        evt.preventDefault();
        const [email, tripId, tripName, displayName] = [evt.target.toEmail.value, this.props.match.params.tripId, this.state.name, this.props.user.displayName]
        db.collection('invites')
            .add({
                email,
                displayName,
                tripId,
                tripName
            })
        evt.target.toEmail.value = '';
        this.setState({showInvite: false});
    }

    render(){
        const tripRef = db.collection('trips').doc(this.state.tripId);
        let isPartOfTrip = this.state.isPartOfTrip;
        return (
            (isPartOfTrip ?
            <div className="trip-whole-page">
                <div className="trip-header">
                    <h1>{this.state.name}</h1>
                        <button className="btn waves-effect waves-light" id="invite-btn" onClick={() => this.setState({showInvite: !this.state.showInvite})}>Invite!</button>
                    {this.state.showInvite &&
                        <form className="center-form" onSubmit={this.sendInvite}>
                            <label className="label">
                                <input type="text" name="toEmail" id="email-input" placeholder="Email"/>
                            </label>
                            <input className="btn center-self" type="submit" value="Submit" />
                        </form>
                    }
                </div>
                <div className="chat-itin-pin container-fluid">
                    <Chat room={tripRef.collection('chat')} user={this.props.user} />
                <div className="flex-row-wrap around chat-itin-pin container-fluid">
                    <Chat room={tripRef.collection('chat')} user={this.props.user} numOfUsers={this.state.numOfUsers} events={tripRef.collection('event')} />
                    <Itinerary
                        trip= {tripRef}
                        room={tripRef.collection('event')}
                        user={this.props.user}
                        startDate={this.state.startDate}
                        endDate = {this.state.endDate} />
                    <Pinned room={tripRef.collection('event')} user={this.props.user} />
                </div>
            </div>
            </div>
            :
            <div>
                You need to be invited to this trip!
            </div>)
        )
    }
}

function getTrue(obj){
    let truthy = 0;
    for (var person in obj) {
        if (obj[person]) truthy++}
    return truthy;
 }
