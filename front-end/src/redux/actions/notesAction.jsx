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
} from "../types/noteTypes";
import axios from "axios";

export const listNotes = () => async (dispatch, getState) => {
  try {
    // will set the loading to true
    dispatch({ type: NOTES_LIST_REQUEST });

    // fetching the user info from the state
    const {
      userLogin: { userInfo },
    } = getState();

    //just like sending bearer token from postman to backend
    const options = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/notes",
      options
    );
    // console.log(data);

    // if request is success dispatch this action and pass the data to the notes state inside the reducer
    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message = err.message;
    // if fails fire this action and pass the message
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    // getting title,content,category from create note page

    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });

      // userInfo from the state, need to be send along with the headers
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // sending title,content,category that we received from the user to the backend
      const { data } = await axios.post(
        "http://localhost:5000/api/notes/create",
        { title, content, category },
        config
      );

      dispatch({
        type: NOTES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const message = err.message;

      dispatch({
        type: NOTES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //   get the id of each note
      const { data } = await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        { title, content, category },
        config
      );

      dispatch({
        type: NOTES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const message = err.message;

      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/notes/${id}`,
      config
    );

    dispatch({
      type: NOTES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message = err.message;
    dispatch({
      type: NOTES_DELETE_FAIL,
      payload: message,
    });
  }
};
