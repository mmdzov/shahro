/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import ListEvents from "components/Events/ListEvents";
import ItemEvent from "components/Events/ItemEvent";
import { useLocation, useHistory } from "react-router";
import BottomMenu from "./BottomMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCalendarEvents,
  deleteEvent,
  eventSelected,
  getCalendarEvents,
  setCalendarDate,
  setHasFirstTime,
  setMonth,
} from "../../store/actions/calendarActions";
import {
  BtmMenuClose,
  BtmMenuHeaderTitle,
  BtmMenu,
  BtmMenuHeader,
  BtmMenuLine,
  PpForm,
} from "./StyledEvents";
import "./StyledEvents.jsx";
import "./events.css";
import EventsHeader from "./EventsHeader";
import Loading from "components/Utilities/Loading";
import monthColors from "utilities/monthColors";
import currentDate from "utilities/currentDate";
import NotFoundIcon from "../../components/Utilities/NotFoundIcon";
import getFullYear from "utilities/getFullYear";
import styled from "styled-components";
import CheckIcon from "@material-ui/icons/Check";
import { Close } from "@material-ui/icons";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import AuthAlert from "components/Utilities/AuthAlert";
import ModalConnection from "components/Utilities/Modal/ModalConnection";
import AddIcon from "components/Utilities/AddIcon";
import monthList from "utilities/monthList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Events() {
  const {
    events: evs,
    loading,
    index: month,
    date,
    hasFirstTime,
  } = useSelector(({ calendar }) => calendar);
  const { year: y, month: m, day: d } = useParams();

  const { state: locState } = useLocation();
  const history = useHistory();
  const [vsbl, setVsbl] = useState(false);
  const [btmMode, setBtmMode] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (locState) {
      dispatch(setMonth(locState?.month));
      let date = { year: currentDate(0), month };
      if (locState?.token) {
        let b = { ...locState };
        delete b.token;
        dispatch(setCalendarDate(b));
      } else {
        dispatch(setCalendarDate({ ...date, day: 1 }));
      }
    }
    return () => {
      dispatch(clearCalendarEvents());
      dispatch(setHasFirstTime(true));
      dispatch(setMonth(currentDate(1)));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrentDate = (
    goCurrentCalendar = false,
    callback = () => {},
    preventGetDate = false
  ) => {
    let d;
    if (y?.length === 4 && m?.length <= 2 && d?.length <= 2) {
      d = { year: y, month: m, day: d };
    } else {
      d = getFullYear();
    }
    if (!preventGetDate) {
      dispatch(getCalendarEvents(d));
    }
    dispatch(
      setCalendarDate({
        day: d?.day,
        month: d?.month,
        year: d?.year,
      })
    );
    dispatch(setMonth(date.month));
    if (goCurrentCalendar) {
      callback(d);
    }
    dispatch(setHasFirstTime(false));
  };
  useEffect(() => {
    if (hasFirstTime) {
      let d;
      if (y?.length === 4 && m?.length <= 2) {
        d = { year: y, month: m };
      } else {
        d = { year: locState?.year, month: locState?.month };
      }
      console.log(date, month, locState, d);
      if (locState?.token) {
        dispatch(getCalendarEvents(d));
        dispatch(setHasFirstTime(false));
      } else {
        if (locState?.year && locState?.month) {
          console.log(locState, month);
          dispatch(
            getCalendarEvents({
              ...d,
              day: locState?.day,
              month: locState?.month,
            })
          );
          dispatch(
            setCalendarDate({
              ...d,
              day: locState?.day,
              month: locState?.month,
            })
          );
          dispatch(setHasFirstTime(false));
        } else setCurrentDate();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locState, hasFirstTime]);
  // useEffect(() => {

  //   if (!hasFirstTime) {
  //     dispatch(
  //       getCalendarEvents({
  //         day: date?.day,
  //         month: date?.month,
  //         year: date?.year,
  //       })
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ date]);
  const weeks = [
    "يكشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنج شنبه",
    "جمعه",
    "شنبه",
  ];
  const [eventList, setEventList] = useState(evs);

  const changeEventSchema = (events) => {
    const srt = events.sort((a, b) => a.day - b.day);
    const obj = {};

    for (let i = 0; i < 31; i++) {
      let flt = srt.filter((item) => item.day === i);
      if (flt.length > 0) {
        obj[i] = {
          title: weeks[flt[0].day_week],
          data: flt,
        };
      }
    }
    let newData = [];
    for (let i in obj) {
      const fullItem = obj[i];
      fullItem.data[0].dayWeekName = fullItem?.title;
      newData.push(...fullItem.data);
    }
    setEventList(newData);
    return newData;
  };
  useEffect(() => {
    if (evs) {
      changeEventSchema(evs);
    }
  }, [evs]);
  useEffect(() => {
    if (!loading && locState?.token && evs?.length > 0) {
      const dm = document?.getElementById(`b${locState.token}`);
      const pos = dm?.getBoundingClientRect()?.y;
      dm?.classList?.add("ActiveSingleEvent");
      window.scrollTo({ top: ~~pos - 70 });
    }
  }, [evs, locState, loading]);
  const handleVisibleDetails = () => {
    setVsbl(true);
    setBtmMode("add");
  };
  const handleClickEvent = (e, id) => {
    setBtmMode("modify");
    const ind = evs.findIndex((item) => item.token === id);
    dispatch(eventSelected(evs[ind]));
    setVsbl(true);
  };
  const [height, setHeight] = useState(0);
  const [modalConnectionLoading, setModalConnectionLoading] = useState(false);
  const { alert: notifAlert } = useSelector(({ _MainReducer }) => _MainReducer);
  useEffect(() => {
    setHeight(window.innerHeight - 250);
    window.addEventListener("resize", () =>
      setHeight(window.innerHeight - 250)
    );
  }, []);
  // if (!locState) return <div></div>;
  const handleDeleteEvent = async (token) => {
    await setModalConnectionLoading(true);
    await dispatch(deleteEvent(token));
    await setModalConnectionLoading(false);
  };
  const [evLoading, setEvLoading] = useState(false);

  const { loading: l } = useSelector(({ _MainReducer }) => _MainReducer);
  if (l.on) return <LodingDotPlus isRelative={false} isFixed />;
  return (
    <Container className={vsbl ? "activeEvents" : ""}>
      <div style={{ zIndex: 999, position: "relative" }}>
        <EventsHeader
          onAdd={handleVisibleDetails}
          currentDate={setCurrentDate}
          eventLoading={evLoading}
          setEventLoading={setEvLoading}
        />
      </div>
      {modalConnectionLoading ? <ModalConnection /> : null}
      {notifAlert.mode === "deleteEvent" ? (
        <AuthAlert
          alert={{ title: notifAlert?.title, message: notifAlert?.msg }}
        />
      ) : null}
      <ListEvents style={{ zIndex: 0, position: "relative" }}>
        {!loading && !evLoading && !vsbl ? (
          eventList?.length > 0 ? (
            eventList?.map((item) => (
              <ItemEvent
                id={item.token}
                handleClick={handleClickEvent}
                data={item}
                key={item.token}
                color={monthColors[month - 1]}
              />
            ))
          ) : (
            <NotFoundIcon title="هیچ رویدادی برای این ماه ثبت نکرده اید." />
          )
        ) : !evLoading ? (
          <Loading
            marginTop={70}
            color={monthColors[month - 1]}
            background="transparent"
          />
        ) : null}
      </ListEvents>
      <SwipeUp
        onChange={() => setVsbl(false)}
        open={vsbl}
        overflowHeight={!vsbl ? 0 : 1}
      >
        <Scroll style={{ height: height, direction: "rtl" }}>
          {vsbl ? (
            <HeaderContainer>
              <BtmMenuHeaderTitle fontFamily="iranyekan">
                {btmMode === "add" ? "افزودن رویداد" : "ویرایش رویداد"}
              </BtmMenuHeaderTitle>
              <BtmMenuClose>
                <Close onClick={() => setVsbl(false)} />
              </BtmMenuClose>
            </HeaderContainer>
          ) : null}
          <BottomMenu
            value={vsbl}
            mode={btmMode}
            setValue={setVsbl}
            handleDeleteEvent={handleDeleteEvent}
          />
        </Scroll>
      </SwipeUp>
      {!vsbl && !evLoading ? (
        <AddIcon
          mode="div"
          onClick={handleVisibleDetails}
          style={{ background: monthColors[month - 1] }}
        />
      ) : null}
    </Container>
  );
}
const SwipeUp = styled(SwipeableBottomSheet)``;

const Container = styled.div`
  & > div:nth-child(3) {
    z-index: 999 !important;
  }
`;

const HeaderContainer = styled.div`
  height: 46px;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  justify-content: space-between;
  padding: 0 15px;
  /* border-radius: 30px 30px 0 0; */
  display: flex;
  align-items: center;
  z-index: 9999;
  position: absolute;
  top: -45px;
  width: 100%;
  left: 0;
  border-radius: 15px 15px 0 0;
`;
export default Events;
