import React from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';
import OnlineUsers from './OnlineUsers.jsx';


const MessageList = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <nav>
        <h1>Chatty</h1>
        <OnlineUsers clientCount={this.props.clientCount} />
        </nav>
        <div id="message-list">
          {this.props.messages.map((message) => {
            if (message.username === undefined) {
              return <MessageSystem
            key={message.id}
            {...message}
            />
          } else {
            return <Message
            key={message.id}
            {...message}
            />
          }
          })}
        </div>
      </div>
    );
  }
});

export default MessageList;