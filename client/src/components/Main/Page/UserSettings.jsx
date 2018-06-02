import React, { Component } from 'react';

class UserSettings extends Component {
  render() {
    const details = this.props.user;
    console.log(this.props.user);
    return (
      <div>
        <ul>
          {Object.keys(details).map((item, i) => (
            <li key={i}>{item} : {Object.values(details)[i]}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserSettings
