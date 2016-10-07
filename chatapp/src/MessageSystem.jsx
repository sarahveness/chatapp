import React from 'react';

const MessageSystem = React.createClass({
  render: function() {
    return (
      <div className="message-system">
        {this.props.message}
      </div>
    )
  }
});

export default MessageSystem;