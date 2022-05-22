import {
    NOTES_LIST_REQUEST,
    NOTES_LIST_SUCCESS,
    NOTES_LIST_FAIL,
    NOTES_CREATE_REQUEST,
    NOTES_CREATE_SUCCESS,
    NOTES_CREATE_FAIL,
    NOTES_UPDATE_FAIL,
    NOTES_UPDATE_REQUEST,
    NOTES_UPDATE_SUCCESS,
    NOTES_DELETE_FAIL,
    NOTES_DELETE_REQUEST,
    NOTES_DELETE_SUCCESS,
} from '../types/noteTypes';

export const noteListReducer = (state = { notes: [] }, action) => {
    switch (action.type) {
        // whenever call the api its going to: 
        // request the notes 
        case NOTES_LIST_REQUEST:
            return { loading: true };
        // if true..
        case NOTES_LIST_SUCCESS:
            return { loading: false, notes: action.payload };
        //if fail..
        case NOTES_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const noteCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case NOTES_CREATE_REQUEST:
            return { loading: true };
        // note has been successfully created
        case NOTES_CREATE_SUCCESS:
            return { loading: false, success: true };
        //if fail..
        case NOTES_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const noteUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case NOTES_UPDATE_REQUEST:
        return { loading: true };
      case NOTES_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case NOTES_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };

  export const noteDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case NOTES_DELETE_REQUEST:
        return { loading: true };
      case NOTES_DELETE_SUCCESS:
        return { loading: false, success: true };
      case NOTES_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
