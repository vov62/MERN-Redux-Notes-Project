import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../types/userTypes";
import axios from "axios";

// user login action
// nest function from redux thunk
export const login = (email, password) => async (dispatch) => {
  try {
    // call user login request from the reducer, that return 'loading:true' .
    dispatch({ type: USER_LOGIN_REQUEST });

    // api request to login the user
    const userInputData = { email, password };
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInputData),
    };

    //fetch data from backend,user enter email and password, send to the server to find match.
    const dataFromUserLogin = await fetch(
      "http://localhost:5000/api/users/login",
      options
    );
    const returnDataFromServer = await dataFromUserLogin.json();
    // console.log(returnDataFromServer);

    // if login successful then call user login success from the reducer which will return 'userInfo'
    dispatch({ type: USER_LOGIN_SUCCESS, payload: returnDataFromServer });

    localStorage.setItem("userInfo", JSON.stringify(returnDataFromServer));
  } catch (error) {
    // if fail, call the user login fail from the reducer and set the payload to error
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.returnDataFromServer.message
          ? error.response.returnDataFromServer.message
          : error.message,
    });
  }
};

// user logout action
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

// user register action
export const register =
  (name, email, password, picture) => async (dispatch) => {
    // creating user register and save to db .
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const userData = { name, email, password, picture };
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      };

      //user enter name,email,password and picture, send to the server.
      const postUserData = await fetch(
        "http://localhost:5000/api/users",
        options
      );
      const dataSaveToDb = await postUserData.json();

      console.log(dataSaveToDb);

      dispatch({ type: USER_REGISTER_SUCCESS, payload: dataSaveToDb });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: dataSaveToDb });

      //store the data in local storage. convert it to string because local storage cannot store object
      localStorage.setItem("userInfo", JSON.stringify(dataSaveToDb));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.dataSaveToDb.message
            ? error.response.dataSaveToDb.message
            : error.message,
      });
    }
  };

// User profile update
export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/users/profile",
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    const message = err.message;

    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};
