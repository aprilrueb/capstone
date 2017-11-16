import React, { Component } from 'react';
import { fire } from './database';

const messages = [
  {id: 1, user: {id: 1, name: 'Caryn'}, text: 'Cupcake Ipsum!'},
  { id: 2, user: {id: 2, name: 'Annelise'}, text: 'Bluetooth Headphones!'},
  { id: 3, user: { id: 3, name: 'Ella' }, text: 'Jelly-o dessert gingerbread muffin topping powder cupcake. Sweet roll gummi bears chocolate cake gummies. '},
  { id: 4, user: { id: 4, name: 'April' }, text: 'Macaroon muffin cake gummies chocolate cake jelly sugar plum. Tart carrot cake pie gummi bears caramels powder.'},
]

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: messages,
      showChat: false
    }; // <- set up react state
    this.handleClick = this.handleClick.bind(this);
  }

  // componentWillMount() {
  //   /* Create reference to messages in Firebase Database */
  //   let messagesRef = fire.database()
  //     .ref('messages')
  //     .orderByKey()
  //     .limitToLast(100);
  //   messagesRef.on('child_added', snapshot => {
  //     /* Update React state when message is added at Firebase Database */
  //     let message = { text: snapshot.val(), id: snapshot.key };
  //     this.setState({ messages: [message].concat(this.state.messages) });
  //   });
  // }

  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
  //   fire.database().ref('messages').push(this.inputEl.value);
  //   this.inputEl.value = ''; // <- clear the input
  // }
    const curMsg = this.state.messages;
    this.setState({ messages: [...curMsg,
      { id: curMsg.length + 1,
        user: { id: 1, name: 'Caryn' },
        text: this.inputEl.value }
      ]});
    this.inputEl.value = '';
  }

  handleClick(evt){
    evt.preventDefault();
    this.setState({showChat: !this.state.showChat});
  }

  render() {
    console.log('messages are: ', this.state.messages)
    return (
      this.state.showChat ?
        (<form onSubmit={this.addMessage.bind(this)} style={{ zIndex: 2, position: 'fixed', top: '20vh', left: '70vw', backgroundColor: 'white', height: '80vh', width: '30vw'}}>
        <div style={{overflowY: 'scroll', overflowWrap: 'break-word', height: '75vh'}}>
          { /* Render the list of messages */
            this.state.messages.map(message => <Message key={message.id} message={message} />)
          }
        </div>
        <input type="text" ref={el => {this.inputEl = el}} />
        <input type="submit" />
        <button onClick={this.handleClick} >Chat</button>
      </form>)
      :
      (
          <button onClick={this.handleClick} style={{ zIndex: 2, position: 'fixed', top: '95vh', left: '95vw' }}>Chat</button>
      )
    );
  }
}

export const Message = (props) => {
  const {user, text, time} = props.message;
  return (
    <div>
      <p>{user.name}</p>
      <p>{text}</p>
      <p>{time}</p>
    </div>
  )
}

export default ChatApp;
