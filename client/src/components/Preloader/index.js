import React from 'react';

const Preloader = props => {
	return (
		<div style={props.wrapperStyle} className={props.visible ? "" : "hide"}>
        	<div className="preloader-wrapper big active">
            	<div className="spinner-layer spinner-blue-only">
            		<div className="circle-clipper left">
                    	<div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                    	<div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                    	<div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
	);
}
/*
    npm install prop-types;
    Component.propTypes = {
        text: PropTypes.string.isRequired,
    };
*/
export default Preloader;