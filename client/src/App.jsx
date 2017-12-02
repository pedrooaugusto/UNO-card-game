import React from 'react';
import Menu from './scenes/Menu/';
import Error from './scenes/Error/';
import Hall from './scenes/Hall/';
import Game from './scenes/Game/';
import {Route, Switch, Router} from 'react-router-dom';
import History from './data/History';

function AppView(props) {
	return (
		<Router history = {History}>
			<Switch>
				<Route exact path="/">
					<Menu 
						history = {History} 
						{...props.menu} />
				</Route>
				<Route path="/hall/:name">
					<Hall 
						history = {History} 
						{...props.hall} />
				</Route>
				<Route path="/game/:name">
					<Game 
						history = {History} 
						{...props.game} />
				</Route>
				<Route path="/nopermission">
					<Error 
						statusCode = {500}
						message = {"Você não tem permissão para acessar esta sala"} 
						{...props} />
				</Route>
				<Route>
					<Error statusCode = {404} message = {"Esta página não existe"} {...props} />
				</Route>
			</Switch>
		</Router>
	);
}

export default AppView;