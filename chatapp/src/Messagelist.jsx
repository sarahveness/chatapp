import React from 'react';
import Message from './Message.jsx';
import MessageSystem from './MessageSystem.jsx';


const MessageList = React.createClass({
  render: function() {
    // console.log(this.props.messages)
    return (
      <div>
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