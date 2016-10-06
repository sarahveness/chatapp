import React from 'react';

const Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        <span className="username">{this.props.username}</span>
        <span className="content">{this.props.message}</span>
      </div>
    )
  }
});

export default Message;