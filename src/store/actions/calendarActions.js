import * as types from "./types";
import axios from "axios";
import CalendarService from "../../api/calendarService";
import getFullYear from "utilities/getFullYear";
import { clearErrMsg, setAlert, setErrMsg } from "./_MainAction";
import handleApiErrors from "utilities/handleApiErrors";
export const setCalLoading = () => {
  return {
    type: types.SET_LOADING_CALENDAR,
  };
};

export const clearCalendarEvents = () => ({
  type: types.CLEAR_CALENDAR_EVENTS,
});

export const clearCalLoading = () => ({
  type: types.CLEAR_LOADING_CALENDAR,
});

export const setMonth = (month) => ({
  type: types.SET_MONTH,
  payload: month,
});

export const clearMonth = () => ({
  type: types.CLEAR_MONTH,
  payload: 1,
});

export const setCalendarTime = (time) => ({
  type: types.SET_CALENDAR_TIME,
  payload: time,
});

export const setCalendarDate = (date) => ({
  type: types.SET_CALENDAR_DATE,
  payload: date,
});

export const clearCalendarTime = () => ({
  type: types.CLEAR_CALENDAR_TIME,
});

export const clearCalendarDate = () => ({
  type: types.CLEAR_CALENDAR_DATE,
  payload: getFullYear(),
});

export const setHasFirstTime = (hasFirstTime = true) => ({
  type: types.SET_HAS_FIRST_TIME,
  payload: hasFirstTime,
});

//get events
export const getCalendarEvents = (params) => async (dispatch) => {
  console.log(params);
  try {
    dispatch(setCalLoading());
    const {
      result: { calendars: clds },
    } = await CalendarService.getEvents(params);
    dispatch({ type: types.GET_CALENDAR_EVENTS, payload: clds });
    dispatch(clearCalLoading());
  } catch (e) {
    dispatch(clearCalLoading());
    throw new Error(e);
  }
};
//event selected
export const eventSelected = (event = {}) => ({
  type: types.EVENT_SELECTED,
  payload: event,
});

export const setHomeCalendar = (params) => ({
  type: types.SET_HOME_CALENDAR,
  payload: params,
});

export const deleteEvent = (token) => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  try {
    const data = await CalendarService.deleteEvent(token);
    handleApiErrors(data)
      .then(({ alert }) => {
        const { events, homeCalendar } = getState().calendar;
        const filtered = events.filter((item) => item?.token !== token);
        const filteredHomeCalendar = homeCalendar.filter(
          (item) => item?.token !== token
        );
        dispatch({ type: types.GET_CALENDAR_EVENTS, payload: filtered });
        dispatch({
          type: types.SET_HOME_CALENDAR,
          payload: filteredHomeCalendar,
        });

        if (alert.has === 1) {
          dispatch(
            setAlert({
              mode: "deleteEvent",
              show: true,
              has: alert?.has,
              msg: alert?.message,
              title: alert?.title,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
        dispatch(
          setAlert({
            mode: "deleteEvent",
            show: true,
            has: e?.has,
            msg: e?.message,
            title: e?.title,
          })
        );
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

//add events
export const setCalendarEvents =
  ({ title, description, time }, handleAdd = () => {}) =>
  async (dispatch, getState) => {
    const {
      calendar: { events },
    } = getState();
    const fullConcat = { ...time, title, description };
    const { result } = await CalendarService.addPopup(fullConcat);
    events.push(result.event);
    const newData = handleAdd(events);
    if (result?.event) {
      dispatch({
        type: types.SET_CALENDAR_EVENTS,
        payload: { events: newData },
      });
    }
  };

//modify events
export const modifyCalendarEvents =
  ({ title, description, time }) =>
  async (dispatch, getState) => {
    const {
      calendar: {
        events,
        selected: { token },
      },
    } = getState();
    const fullConcat = { ...time, title, description, token: token };
    const { result } = await CalendarService.modifyPopup(fullConcat);
    if (result) {
      const index = events.findIndex(
        (item) => item.token === result?.event.token
      );
      events[index] = result.event;
      dispatch({ type: types.MODIFY_CALENDAR_EVENTS, payload: events });
    }
  };

export const getCalendar = () => async (dispatch) => {
  /**
   * @deprecated
   */
  try {
    const session = await localStorage.getItem("sessionID");
    const auth = await localStorage.getItem("authID");
    if (session && auth) {
      dispatch(setCalLoading());
      const res = await axios.post(
        "https://api.mireseh.ir/v1/main",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authID: auth,
            sessionID: session,
          },
        }
      );
      if (res.data.alert && res.data.alert.has === 1) {
        dispatch({
          type: types.SET_ALERT,
          payload: res.data.alert,
        });
      }
      if (res.data.status === 1) {
        dispatch({
          type: types.GET_CALENDAR,
          payload: {
            events: res.data.result.calendars,
            posts: res.data.result.posts,
          },
        });
      }
      dispatch(clearCalLoading());
    }
  } catch (err) {
    dispatch({
      type: types.GET_ERROR,
      payload: err,
    });
  }
};
