
import React, { Component } from 'react';
import Title from './components/Title/';
import RoomsList from './components/RoomsList';
import RoomInfoModal from './components/RoomInfoModal';
import CreateRoomModal from './components/CreateRoomModal';
import AboutModal from './components/AboutModal/';

import './styles.css';

class Menu extends Component {
	componentDidMount() {
		document.title = "Uno - Choose Room";
	}
	render(){
		return (
			<div className="scene--menu">
				<div className="container">
		            <div className="row">
		            	<div className="col l10 s12 push-l1 push-s0">
		                	<Title />
		              	</div>
		            </div>
		            <div className="row">
		            	<div className="col l6 s12 push-l3 push-s0">
		                	<RoomsList 
		                  		status = {this.props.state.getIn(['roomList', 'status'])}
		                  		rooms = {this.props.state.getIn(['roomList', 'rooms'])}
		                  		onOpenRoom = {this.props.roomInfo.onOpenRoom} 
		                  		init = {this.props.roomList.init}
		                  		loadAll = {this.props.roomList.loadAll}/>
		              	</div>
		           	</div>
		            <div className="row">
		            	<div className="col l6 s12 push-l3 push-s0">
		               		<button className="waves-effect waves-light btn blue hoverable" 
		                  		onClick = {this.props.createRoom.onOpenModal}>
		                    		Criar Sala
		                	</button>
		                	<button className="waves-effect waves-light btn blue hoverable right" 
		                  		onClick = {this.props.createRoom.aboutStates(true)}>
		                    		About
		                	</button>
		              	</div>
		            </div>
          		</div>
		        <div className="foot">
		        	Created By Pedro Augusto
		        </div>
		        <RoomInfoModal 
		        	isOpen = {this.props.state.getIn(['roomInfo', 'isOpen'])}
		        	displayedRoom = {this.props.state.getIn(['roomInfo', 'displayedRoom'])}
		        	message = {this.props.state.getIn(['roomInfo', 'message'])}
		        	onCloseRoom = {this.props.roomInfo.onCloseRoom}
		        	join = {this.props.roomInfo.join}
		        	history= {this.props.history}/>
		        <CreateRoomModal
		        	isOpen = {this.props.state.getIn(['createRoom', 'isOpen'])}
		        	message = {this.props.state.getIn(['createRoom', 'message'])}
		        	created = {this.props.state.getIn(['createRoom', 'created'])}
		        	onCloseModal = {this.props.createRoom.onCloseModal}
		        	onCreate = {this.props.createRoom.onCreate}
		        	history= {this.props.history}/>
		        <AboutModal 
		        	isOpen = {this.props.state.get('aboutModal')}
		        	onCloseModal = {this.props.createRoom.aboutStates(false)}/>
			</div>
		);
	}
}

export default Menu;