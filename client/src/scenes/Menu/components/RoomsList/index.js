import React from 'react';
import List from './components/List';
import Preloader from '../../../../components/Preloader';
import './styles.css';

const wrapperStyle = {
    marginTop: "50px", 
    height: "200px", 
    display: "flex", 
    flexFlow: "row",
    justifyContent: "center"
};
class RoomsList extends React.Component
{
    componentWillMount()
    {
        this.props.init();
        this.props.loadAll();
    }
    shouldComponentUpdate(nextProps, nextState)
    {
        return (this.props.rooms.size !== nextProps.rooms.size || this.props.status !== nextProps.rooms.status);
    }
    showRoomInfo = (event) => 
    {
        this.props.onOpenRoom(event.currentTarget.dataset);
    }
    render()
    {
        const content = this.props.status === 'LOADING' ? 
                <Preloader visible = {true} wrapperStyle = {wrapperStyle}/> :
                <List rooms = {this.props.rooms} showRoomInfo = {this.showRoomInfo}/>;
        return (
            <div className="card content">
                <div className = "content__title">Selecione uma sala</div>
                <div className="rooms-list-wrapper">
                    {content}
                </div>
            </div>
        );
    }
}

export default RoomsList;