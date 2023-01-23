/* eslint-disable no-unused-vars */
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemAppBar, PlusItemAppBar } from "./StyledEvents";
import {
  ArrowBack as ArrowBackIcon,
  ControlPoint,
  TrendingUpRounded,
} from "@material-ui/icons";
import CalendarEvents from "components/Events/CalendarEvents";
import { setLoading } from "store/actions/_MainAction";
import usePath from "hooks/usePath";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  clearMonth,
  getCalendarEvents,
  setCalendarDate,
  setMonth,
} from "store/actions/calendarActions";
import useForceUpdate from "hooks/useForceUpdate";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const EventsHeader = ({
  onAdd,
  currentDate = () => {},
  eventLoading,
  setEventLoading = () => {},
}) => {
  const {
    gradient,
    date,
    index: month,
    events: evs,
  } = useSelector(({ calendar }) => calendar);
  const [appBarheight, setAppBarheight] = useState(0);
  const AppBarRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    setAppBarheight(AppBarRef.current.getBoundingClientRect().height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  const { goBack, goReplace } = usePath();
  // const { year: y } = useParams();
  const location = useLocation();
  const handleBack = () => {
    const path = location?.pathname.split("/");
    if (path[1] === "events" && path[2]?.length > 0) {
      goReplace("/");
      dispatch(setLoading("eventToHome", true));
    } else {
      goBack();
    }
  };
  const history = useHistory();
  const handleChange = async (newValue, mode = "none") => {
    let newDate = {};
    let finalValue = {};
    if (Object.keys(newValue)?.length > 0) finalValue = newValue;
    else finalValue = newDate;
    if (mode === "back") {
      finalValue = {
        year: date?.month === 12 ? date?.year - 1 : date?.year,
        month: date?.month - 1 === 0 ? 12 : date?.month - 1,
        day: date?.day,
      };
      console.log(finalValue);
      await dispatch(setMonth(date?.month - 1 === 0 ? 12 : date?.month - 1));
      await dispatch(setCalendarDate(finalValue));
    } else if (mode === "forward") {
      finalValue = {
        year: date?.month === 12 ? date?.year + 1 : date?.year,
        month: date?.month + 1 === 13 ? 1 : date?.month + 1,
        day: date?.day,
      };
      await dispatch(setMonth(date?.month + 1 === 13 ? 1 : date?.month + 1));
      await dispatch(setCalendarDate(finalValue));
    } else {
      await dispatch(setMonth(finalValue.month));
      await dispatch(setCalendarDate(finalValue));
    }
    if (date.month !== finalValue.month) {
      let value = { year: finalValue.year, month: finalValue.month };
      history.push(
        `/events/${finalValue.year}/${finalValue?.month}/${finalValue?.day}`
      );
      await dispatch(getCalendarEvents(value));
    } else {
      history.push(
        `/events/${finalValue.year}/${finalValue?.month}/${finalValue?.day}`
      );
    }

    // TODO: Uncaught TypeError: Cannot read property 'findIndex' of undefined
    try {
      const index = evs?.findIndex((item) => item?.day === finalValue?.day);
      if (index && index >= 0) {
        let tkn = evs[index]?.token ?? "noToken";
        if (tkn && tkn !== "noToken") {
          const dm = document.getElementById(`b${tkn}`);
          const pos = ~~dm?.getBoundingClientRect()?.y;
          window.scrollTo(0, pos - 50);
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    const y = { ...date, month };
    dispatch(setCalendarDate(y));
    return () => dispatch(clearMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoClicked = (mode) => {
    let newDate = {};
    if (mode === "back") {
      handleChange(newDate, "back");
    } else {
      handleChange(newDate, "forward");
    }
  };
  // useEffect(() => {
  //   const back = document.querySelector(".-right");
  //   const forward = document.querySelector(".-left");
  //   back.addEventListener("click", () => handleGoClicked("back"));
  //   forward.addEventListener("click", () => handleGoClicked("forward"));
  //   return () => {
  //     back.removeEventListener("click", () => handleGoClicked("back"));
  //     forward.removeEventListener("click", () => handleGoClicked("forward"));
  //   };
  // }, []);
  const handleChangeCalendar = async (d) => {
    await setEventLoading(true);
    await handleChange(d);
    setEventLoading(false);
  };
  return (
    <Fragment>
      {eventLoading ? <LodingDotPlus isRelative={false} isFixed /> : null}
      <AppBar
        className={gradient[month]}
        elevation={0}
        ref={AppBarRef}
        position="fixed"
        style={{ padding: "0 10px" }}
      >
        <Toolbar
          style={{ borderBottom: "1px solid rgb(0,0,0,.1)", padding: 0 }}
        >
          <div onClick={handleBack} style={{ transform: "rotate(180deg)" }}>
            <IconButton color="inherit" style={{ transform: "rotate(180deg)" }}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Typography
            variant="subtitle1"
            className={classes.title}
            style={{ marginRight: 5 }}
          >
            رویداد ها
          </Typography>
          <ItemAppBar>
            {/* <PlusItemAppBar as="div" onClick={onAdd}> */}
            <IconButton
              color="inherit"
              style={{ padding: "0px" }}
              onClick={() => currentDate(true, handleChangeCalendar, true)}
            >
              <div className="today">امروز</div>
              {/* <ControlPoint /> */}
            </IconButton>
            {/* </PlusItemAppBar> */}
          </ItemAppBar>
        </Toolbar>
      </AppBar>
      <AppBar
        className={gradient[month]}
        elevation={1}
        position="static"
        style={{ paddingTop: "55px", overflow: "hidden", height: "315px" }}
      >
        {eventLoading ? (
          <LodingDotPlus isRelative={false} isFixed />
        ) : (
          <CalendarEvents handleChange={handleChange} />
        )}
      </AppBar>
    </Fragment>
  );
};

export default EventsHeader;
