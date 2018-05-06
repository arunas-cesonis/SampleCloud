import React, { Component } from 'react';
//Using Link for updating URL, Content.jsx will pick them up al will load the req cont
import { Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import '../css/menu.css';

class Menu extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}
	
	render() {
        // Get the current location of the APP so I can check against <Link> path
        const currentLocation = this.props.location.pathname;
        console.log(currentLocation);
		const navItems = [
			{ path: '/', name: 'Home' },
			{ path: '/about', name: 'About' },
			{ path: '/browse', name: 'Browse' },
			{ path: '/upload', name: 'Upload' },
		]
        // To move Menu item into a new file/component
		return (
        	<ul>
			{navItems.map((element, i) => 
                <li key={i}>
                    <Item
                        to={element.path}
                        name={element.name}
                        current={currentLocation}
                    />
                </li>
			)}
			</ul>
		);
	}
}

//Move to a new file.
const Item = (props) => 
    <Link
        className={classNames('navItem', { active: props.current === props.to})}
        to={props.to}
    >{props.name}
    </Link>


//In oder to use withRouter the component has to wrapped in it
export default withRouter(Menu);
