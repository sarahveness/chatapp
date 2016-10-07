import React from 'react';

const OnlineUsers = React.createClass({
  render: function() {
    return (
      <div className="online users">
        There {this.props.clientCount == 1 ? 'is' : 'are'} { this.props.clientCount } { this.props.clientCount == 1 ? 'user' : 'users' } online
      </div>
    )
  }
});

export default OnlineUsers;