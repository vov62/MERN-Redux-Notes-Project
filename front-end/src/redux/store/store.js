import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from '../reducers/userReducers';
import { noteListReducer, noteCreateReducer, noteUpdateReducer, noteDeleteReducer } from '../reducers/notesReducers';


const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const reducer = combineReducers({
    //contain reducers 
    userLogin: userLoginReducer,
    userRegistration: userRegisterReducer,
    userProfileUpdate: userUpdateReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage }
};

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;

