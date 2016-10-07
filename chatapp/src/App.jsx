
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
      const message = JSON.parse(data);
      if(message.type)
      {
        switch(message.type)
        {
          case 'clientCount':
            const { count } = message;
            this.setState({
              clientCount: count
            })
            break;
          case 'incomingNotification':
          case 'incomingMessage':
            const oldMessages = this.state.messages;
            this.setState({
              messages: [...oldMessages, message] // ES6 Spread Notation
            })
            break;
          default:
            console.error("Unknown message type", message);
        }
      }
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
          clientCount={this.state.clientCount}
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