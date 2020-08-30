import { axiosAuth } from "../utils/axiosAuth";

export const SET_GETTING_TICKET_DATA = "SET_GETTING_TICKET_DATA";
export const SET_TICKET_DATA = "SET_TICKET_DATA";
export const SET_TICKET_ERROR = "SET_TICKET_ERROR";
export const ADD_NEW_TICKET = "ADD_NEW_TICKET";
export const SET_LOGIN_USER = "SET_LOGIN_USER";
export const SET_NEW_LOGIN_USER = "SET_NEW_LOGIN_USER";
export const SET_HELPER_TICKET_DATA = "SET_HELPER_TICKET_DATA";
export const SET_HELPER_DATA = "SET_HELPER_DATA";
export const SET_HELPER_ERROR = "SET_HELPER_ERROR"

export const getTicketData = () => (dispatch) => {
  console.log("data", dispatch);
  dispatch({ type: SET_GETTING_TICKET_DATA });
  axiosAuth()
    .get("/api/tickets?status=OPEN&claimed=FALSE")
    .then((res) => {
      dispatch({ type: SET_TICKET_DATA, payload: res.data });
    })
    .catch((err) => {
      console.log("get API failed", err.message);
      dispatch({ type: SET_TICKET_ERROR, payload: err.message });
    });
};

export const addNewTicket = (tickets) => (dispatch) => {
  console.log("add", dispatch);
  dispatch({ type: ADD_NEW_TICKET });
  axiosAuth()
    .post("/api/tickets", tickets)
    .then((res) => {
      console.log("api", res.data);
    })
    .catch((err) => {
      console.log("API failed", err.message);
    });
};

export const login = (user) => (dispatch) => {
  console.log("login", dispatch);
  dispatch({ type: SET_LOGIN_USER });
  axiosAuth()
    .post("https://devdeskqueue3-pt.herokuapp.com/api/auth/login", user)
    .then((res) => {
      console.log("POST is successful!", res.data);
      window.localStorage.setItem("token", res.data.token);
      dispatch({ type: SET_NEW_LOGIN_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(
        "You don't have an account with us yet. Please register!",
        err.message
      );
    });
};

export const getHelperTicketData = () => (dispatch) => {
  console.log("data", dispatch);
  dispatch({ type: SET_HELPER_TICKET_DATA });
  axiosAuth()
    .get("/api/tickets?status=OPEN&claimed=TRUE&claimed_by=USER_ID")
    .then((res) => {
      dispatch({ type: SET_HELPER_DATA, payload: res.data });
    })
    .catch((err) => {
      console.log("get API failed", err.message);
      dispatch({ type: SET_HELPER_ERROR, payload: err.message });
    });
};
