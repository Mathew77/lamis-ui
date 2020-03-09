import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import App from './App';
import './styles/reactDataTable.css';
 

ReactDOM.render(
    <Provider store={createStore(reducers)} >
    <App />
    </Provider>, 
    document.getElementById('root') 
    
);

