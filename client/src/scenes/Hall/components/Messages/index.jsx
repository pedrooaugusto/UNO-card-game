import React from 'react';


const DivMessage = ({myself, text, from}) => {
	const classe = myself ? "hall__room__messages__message myself tri-right right-top" :
							"hall__room__messages__message tri-right left-top";
	return (
		<div className="hall__room__messages__message--wrapper">
			<div className={classe}>
				<div className="hall__room__messages__message__from">~{from}</div>
				<div className="hall__room__messages__message__message">{text.split('\n').map((a, i) => (<div key={i}>{a}</div>))}</div>
			</div>
		</div>	
	);
}
class Messages extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		this.messageList.scrollTop = this.messageList.scrollHeight;
	}
	render(){
		const m = this.props.messages.map((value, i) => {
			return (
				<DivMessage
					key = {i}
					myself = {this.props.socketID === value.from.id}
					from = {value.from.name}
					text = {value.text}/>
			);
		});
		return(
			<div className="hall__room__messages" ref = {(messageList) => (this.messageList = messageList)}>
				{m}
			</div>			
		);
	}
}
export default Messages;