import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';

import App from './app/layout';
import * as serviceWorker from './serviceWorker';
//import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, history } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import { ConnectedRouter } from 'connected-react-router';
//import { loadEvents } from './features/events/eventActions';

const store = configureStore();

//store.dispatch(loadEvents());

const rootElement = document.getElementById('root');

function render() {
    ReactDOM.render(
        // <React.StrictMode>
            <Provider store={store}>
                {/* <BrowserRouter> */}
                <ConnectedRouter history={history}>
                    <ScrollToTop />
                    <App />
                </ConnectedRouter>          
                {/* </BrowserRouter> */}
            </Provider>
        // </React.StrictMode>,
        ,rootElement
    );
}

if (module.hot) {
    module.hot.accept('./app/layout', function() {
        setTimeout(render);
    });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister(); // for dev to see changes
serviceWorker.register(); // for prod to cash code
