import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
//import Perf from 'react-addons-perf'
//window.Perf = Perf;

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();