import React, { Component } from 'react';
import Title from './components/Title';
import RoomsList from './components/RoomsList';
import RoomInfoModal from './components/RoomInfoModal';
import CreateRoomModal from './components/CreateRoomModal';
import './styles.css';

class Menu extends Component {
    render() {
      return (
        <div className="scene--menu">
          <div className="container">
            <div className="row">
              <div className="col l10 s12 push-l1 push-s0">
                <Title />
              </div>
            </div>
            <div className="row">
              <div className="col l8 s12 push-l2 push-s0">
                <RoomsList 
                  {...this.props.roomsList}
                  onOpenRoom = {this.props.roomInfo.onOpenRoom}/>
              </div>
            </div>
            <div className="row">
              <div className="col l8 s12 push-l2 push-s0">
                <button className="waves-effect waves-light btn blue hoverable" 
                  onClick = {this.props.createRoom.onOpenModal}>
                    Criar Sala
                </button>
              </div>
            </div>
          </div>
          <div className="foot">
            Created By Pedro Augusto
          </div>
          <RoomInfoModal {...this.props.roomInfo}     history={this.props.history}/>
          <CreateRoomModal {...this.props.createRoom} history={this.props.history}/>
        </div>
      );
    }
}

export default Menu;
