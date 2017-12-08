import React from 'react';


function normalizeText(text, a, b, c, d, e){
	const k = [["_NAME_", a], ["_TIME_", b], ["_VERB_", c], ["_HOWMANY_", d]];
	for (var i = 0; i < k.length; i++)
		text = text.replace(k[i][0], k[i][1]);
	return text;
}
const Feedback = (props) => {
	const player = props.players.get(props.currentPlayerIndex);
	const myself = props.currentPlayerIndex === props.myIndex;
	const howMany = props.howMany;
	const time = props.time > 9 ? props.time+"s" : "0"+props.time+"s";
	const text = normalizeText(props.text, ...(myself ? ["You", time, "your", howMany] : 
		[player.get("name"), time, "his", howMany]));
	const color = props.color ? ". Current color is "+props.color : "";
	return (
		<div className = "message">
			{text+color}
		</div>
	);
}

export default Feedback;