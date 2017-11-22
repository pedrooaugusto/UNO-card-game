import {createBrowserHistory} from 'history';
import Socket from './DefaultSocket';

const history = createBrowserHistory({});
history.listen((location, action) => {
	if(location.pathname === "/")
		Socket.getSocket().emit("/hall/exit", true);
});
export default history;