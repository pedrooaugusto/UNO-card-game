import React from 'react';
import PropTypes from 'prop-types';

const List = ({rooms, showRoomInfo}) => {
    const content = (() => {
        if(rooms.size === 0) return (<p>Não existem salas. Você pode criar uma!</p>)
        return(
            <table className="bordered rooms-list">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    rooms.map((item, index) => (       
                        <tr 
                            key={item.name} data-room-id={item.name} 
                            data-room-name={item.name}
                            onClick={showRoomInfo}>
                                <td>{item.name}</td>
                                <td>{item.status}</td>
                                <td>{`${item.numberOfPlayers}/${item.capacity}`}</td>
                                <td><i className="material-icons">lock_open</i></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    })();
    return content;
}
List.propTypes = {
	rooms: PropTypes.object.isRequired,
	showRoomInfo: PropTypes.func.isRequired
}
export default List;