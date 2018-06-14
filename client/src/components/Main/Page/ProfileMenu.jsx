import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
/* Material UI Tabs ...
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
      /* Material UI Tabs ....
      <div className={classes.root}>
        <AppBar
          position='static'
          style={{ backgroundColor: 'white' }}
        >
          <Paper>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              style={{ fontSize: '24px' }}
              centered='true'
              fullWidth='false'
              textColor='primary'
              indicatorColor='primary'
            >
              <Tab label='Upload' />
              <Tab label='Samples' />
              <Tab label='Settings' />
            </Tabs>
          </Paper>
        </AppBar>
        { this.state.value === 0 && <Upload /> }
      </div>
*/

class ProfileMenu extends Component {
  componentDidMount(){
    this.props.history.push('/profile/samples');
  }

  render() {
    const current = this.props.location.pathname;
    const items = [
      { path: "/profile/upload", name: 'Upload' }, 
      { path: "/profile/samples", name: 'Samples' },
      { path: "/profile/settings", name: 'Settings' }
    ];

    return(
        <div className='tab_box'>
          <div className='tab_wrap'>
            <ul className='tab_cont'>
              {items.map((item, i) => 
              <li 
                className={classNames('tab', { active: current === item.path })} 
              ><Link 
                  className={classNames('tab_item', { active: current === item.path})} 
                  to={item.path} >{item.name}</Link></li>
              )}
            </ul>
          </div>
        </div>
    );
  }
}

export default withRouter(ProfileMenu); 
