import React from 'react';
import {withRouter} from 'react-router-dom';

const RouterButton = withRouter((props) => (
	<button
    	type={props.type}
    	onClick={() => { props.history.push(props.to) }}>
    		{props.text}
  	</button>
))
export default RouterButton;