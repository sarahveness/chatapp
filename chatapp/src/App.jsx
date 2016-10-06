
import React from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'

const App = React.createClass({

  getInitialState: function() {
    return {
      type: "",
      currentUser: {name: 'Anonymous'},
      messages: [],
      ready: false
    };
  },

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.wss = new WebSocket("ws://"+location.hostname+":3001");
    console.log('Connecting');

    this.wss.onmessage = ({data}) => {
      // let newMessages = this.state.messages;
      // newMessages.push(JSON.parse(message.data));
      // this.setState({messages: newMessages});
      const oldMessages = this.state.messages;
      const message = JSON.parse(data);
      console.log(message);
      this.setState({
        messages: [...oldMessages, message] // ES6 Spread Notation
      })
    },

    this.wss.onopen = () => {
      // this.setState(); // is available
      console.log("Connected to server");
    };
  },

  componentWillUnmount()
  {
    //Clean up all resources like continuos ajax calls, timers, intervals, web sockets, etc...
    this.wss.close();

  },

  render: function() {
    return (
      <div>
        <MessageList
          messages={this.state.messages}
        />
        <ChatBar
          sendMessage={this.addMessage}
          onNameChanged={this.onNameChanged}
          currentUser={this.state.currentUser}
        />
      </div>
    )
  },

  addMessage(message, username) {

    if (username !== this.state.currentUser.name) {
      let newUserMessage = {
        type: "postNotification",
        message: this.state.currentUser.name + " changed their name to " + username
      };
      this.state.currentUser.name = username;

      let newCurrentUser = {name: username};
      this.setState({currentUser: newCurrentUser});
      this.wss.send(JSON.stringify(newUserMessage));
  }
    let msg = {
      type: "postMessage",
      username: this.state.currentUser.name,
      message
    };

    this.wss.send(JSON.stringify(msg));
  },

  // changeUser(username) {
  //   let currentUser = {
  //     type: "postNotification",
  //     currentUser: ""
  //   };

  //   this.wss.send(JSON.stringify(currentUser));

  // },

  onNameChanged(name) {
    this.setState({
      // type: "incomingMessage",
      currentUser: {
        name
      }
    })
  }
});

export default App;