import axios from "axios";
import {
  REGISTER_CREATE_FAIL,
  REGISTER_CREATE_REQUEST,
  REGISTER_CREATE_SUCCESS,
  REGISTER_LIST_FAIL,
  REGISTER_LIST_REQUEST,
  REGISTER_LIST_SUCCESS,
} from "../constants/registerConstants";

export const listRegister = (objectId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REGISTER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // console.log("USERINFO", userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("outpass Action student ID : ",studentId);
    const { data } = await axios.get(
      `/api/qr/entries`,
      config
    );

    dispatch({
      type: REGISTER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: REGISTER_LIST_FAIL,
      payload: message,
    });
  }
};
