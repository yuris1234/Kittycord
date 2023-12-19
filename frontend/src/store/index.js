import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import usersReducer from './user';
import dmsReducer from './dm';
import messagesReducer from './message';
import modalsReducer from './modal';
import friendRequestsReducer from './friendRequest';


const rootReducer = combineReducers({
    session: sessionReducer,
    users: usersReducer,
    dms: dmsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    friendRequests: friendRequestsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;