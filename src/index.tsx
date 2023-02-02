import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppWithRedux from "./app/AppWithRedux";
import {store} from "./API/store";
import {Provider} from "react-redux";
import AppWithReducer from "./trash/AppWithReducer";

ReactDOM.render(
   <Provider store={store}>
       <AppWithRedux />
   </Provider >
    ,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();