import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import tutorsReducer from './reducers/tutorsReducer'
import studentsReducer from './reducers/studentsReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({tutors: tutorsReducer, students: studentsReducer})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
