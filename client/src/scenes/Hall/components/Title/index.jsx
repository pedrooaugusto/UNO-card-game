import React from 'react';

const Title = (props) => {
	return(
		<div>
			<div className="hall__room__title">{props.name}</div>
			<div className="hall__room__title__description">
				* W A I T I N G *
			</div>
			<div className="hall__room__title__divisor">
				______________<big><big>*</big></big>______________
			</div>
		</div>
	);
}
export default Title;