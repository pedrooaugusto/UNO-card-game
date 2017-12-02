import React from 'react';


function normalizeText(text, a, b, c, d){
	const k = [["_NAME_", a], ["_TIME_", b], ["_VERB_", c]];
	for (var i = 0; i < k.length; i++)
		text = text.replace(k[i][0], k[i][1]);
	return text;
}
const Feedback = (props) => {
	const player = props.players.get(props.currentPlayerIndex);
	const myself = props.currentPlayerIndex === props.myIndex;
	const text = normalizeText(props.text, ...(myself ? ["You", "30s", "your"] : [player.get("name"), "30s", "his"]));
	return (
		<div className = "message">
			{text}
		</div>
	);
}

export default Feedback;