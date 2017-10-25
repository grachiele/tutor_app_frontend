import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import tutorsReducer from './reducers/tutorsReducer'
import studentsReducer from './reducers/studentsReducer'
import fetchesReducer from './reducers/fetchesReducer'
import subjectNameReducer from './reducers/subjectNameReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({tutor: tutorsReducer, student: studentsReducer, fetches: fetchesReducer, subjectName: subjectNameReducer})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
