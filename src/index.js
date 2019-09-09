import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';

// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';


// Your saga should listen for the action type of `GET_ZOO_ANIMALS`
function* rootSaga() {
    yield takeEvery('GET_ZOO_ANIMALS', getAnimals);
    yield takeEvery('REMOVE_ANIMAL', deleteAnimal);

}

function* getAnimals() {
    try {
        const response = yield axios.get('/zoo');
        yield put({ type: 'SET_ZOO_ANIMALS', payload:response.data});
    }
    catch(err) {
        console.log('Error in GET', err)
    }
}

function* deleteAnimal(action) {
    try {
        yield axios.delete('/zoo/'+action.payload);
        yield put({ type: 'GET_ZOO_ANIMALS'});
        console.log(action.payload);

    }
    catch(err) {
        console.log('Error in DELETE', err)
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store class and number of unique animals in that class
const zooAnimals = (state = [], action) => {
    switch (action.type) {
        case 'SET_ZOO_ANIMALS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        zooAnimals,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
