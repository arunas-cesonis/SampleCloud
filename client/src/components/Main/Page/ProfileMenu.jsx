import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

class ProfileMenu extends Component {
  render() {
    const current = this.props.location.pathname;
    const items = [
      { path: "/profile/upload", name: 'Upload' }, 
      { path: "/profile/samples", name: 'Samples' },
      { path: "/profile/settings", name: 'Settings' }
    ]
    return(
      <div className='tab_box'>
      <div className='tab_wrap'>
        <ul className='tab_cont'>
          {items.map((item, i) => 
            <li className={classNames('tab', { active: current === item.path })} ><Link className='tab_item' to={item.path} >{item.name}</Link></li>
          )}
        </ul>
      </div>
      </div>
    );
  }
}

export default withRouter(ProfileMenu); 
