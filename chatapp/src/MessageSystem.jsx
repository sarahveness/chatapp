import React from 'react';

const Message = React.createClass({
  render: function() {
    return (
      <div className="message system">
        {this.props.message}
      </div>
    )
  }
});

export default Message;