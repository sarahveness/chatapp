import React from 'react';

let ChatBar = React.createClass({

  handleChange({keyCode}) {
    if (keyCode == 13) {
      // var message = this.state.message;
      const message = this.state.message;
      const username = this.state.username;
      this.props.sendMessage(message, username);
      this.setState({message: ""});
    }
  },

  handleNameChange(event) {
    this.setState({username: event.target.value});
  },

  handleInput(event) {
    this.setState({message: event.target.value});
  },

  getInitialState: function() {
    return {
      message: "",
      username: "Anonymous"
    };
  },

  render: function() {
    return (
      <footer>
          <input
            type="text"
            onChange={this.handleNameChange}
            value={this.state.username}
            placeholder="Anonymous"
          />
          <input
            id="new-message"
            type="text"
            placeholder="Type a message and hit ENTER"
            onChange={this.handleInput}
            onKeyDown={this.handleChange}
            value={this.state.message}
          />
      </footer>
    )
  }
});

export default ChatBar;