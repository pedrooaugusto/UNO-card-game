import React from 'react';

const SignForm = (props) => (
	<div className="formEntrar">
    	<form action="/" method="get" onSubmit = {props.handleSubmit}>
        	<div>Nickaname:</div>
        	<input type="hidden" name="room" value = {props.roomName}/>
            <input type="text" name="nickName" autoComplete="off" required/>
            <div>{props.message}</div>
            <button type="submit" className="btn entrar-button">Entrar</button>
        </form>
    </div>
);

export default SignForm;