/* eslint-disable react-hooks/exhaustive-deps */
import {
  FareConainer as Container,
  FareHeader,
  FareMain,
  Submit,
  FareContent,
  ItemRow,
  AlertMsg,
  ErrorImg,
} from "components/Fares/Fares.styled.js";
import Slider from "components/Utilities/Slider";
import { useEffect, useState } from "react";
// import DatePicker from "react-modern-calendar-datepicker";
import currentDate from "utilities/currentDate";
import DateRangeIcon from "@material-ui/icons/DateRange";
import toPersian from "utilities/ToPersian";
import { Fragment } from "react-is";
import { useDispatch, useSelector } from "react-redux";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import Ripples from "components/Utilities/Ripples";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import styled from "styled-components";
import { getSingleFare } from "store/actions/fareAction";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import toToman from "utilities/toToman";
import usePath from "hooks/usePath";
import AdsFeatures from "components/Ads/AdsFeatures";
import ProductImg from "components/SlideTemp/productImg";
import AvatarLoading from "components/Utilities/AvatarLoading";
import FutureJobLoading from "components/Utilities/Loadings/FutureJobLoading";
import DescriptionLoading from "components/Utilities/Loadings/DescriptionLoading";
import SubSliderLoading from "components/Utilities/Loadings/SubSliderLoading";
import { useHistory } from "react-router-dom";
import FareSubSlider from "components/Fares/FareSubSlider";
import { setAlert } from "store/actions/_MainAction";
import AuthAlert from "components/Utilities/AuthAlert";

const Fare = () => {
  const { fare } = useSelector(({ fare }) => fare);
  const defaultFrom = {
    day: currentDate(2),
    month: currentDate(1),
    year: currentDate(0),
  };

  const defaultTo = {
    day: currentDate(2) + 2,
    month: currentDate(1),
    year: currentDate(0),
  };

  const defaultRange = {
    from: defaultFrom,
    to: defaultTo,
  };
  const { token } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const [l, setLoading] = useState(true);
  const { goReplace } = usePath();
  const [height, setHeight] = useState(window.innerHeight);
  const getData = async () => {
    await setLoading(true);
    await dispatch(getSingleFare(token, goReplace));
    await setLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
  }, []);
  const [selectedDayRange, setSelectedDayRange] = useState(defaultRange);
  const [hasChanged, setChange] = useState(false);
  const handleChange = (e) => {
    // const prev = selectedDayRange;
    const year = currentDate(0);
    const month = currentDate(1);
    const day = currentDate(2);
    if (e?.from?.day < day || e?.from?.month < month || e?.from?.year < year)
      return;
    // if (
    //   e?.to &&
    //   (e?.to?.year !== prev?.to?.year ||
    //     e?.to?.month !== prev?.to?.month ||
    //     e?.to?.day !== prev?.to?.day)
    // ) {
    // }
    setChange(true);
    setSelectedDayRange(e);
  };

  const history = useHistory();

  const handleSubmit = () => {
    console.log("ok");
    if (!hasChanged) {
      dispatch(
        setAlert({
          show: true,
          title: " ",
          msg: "لطفا ابتدا روز های مورد نظرتان را انتخاب کنید",
          mode: "dateInvalid",
        })
      );
      return;
    }
  };
  const { loading, alert: notifAlert } = useSelector(
    ({ _MainReducer }) => _MainReducer
  );

  if (loading.mode === "adsToHome")
    return <LodingDotPlus isRelative={false} isFixed />;

  // console.log("Data: ", fare);

  return (
    <Container
      style={{
        paddingBottom: width >= 640 ? 160 : 60,
      }}
    >
      {notifAlert?.mode === "dateInvalid" ? (
        <AuthAlert alert={{ title: " ", message: notifAlert?.msg }} />
      ) : null}
      <FareHeader>
        {l ? (
          <div
            className=""
            style={{
              paddingBottom: 3,
              width: "100%",
            }}
          >
            <AvatarLoading hasRent />
          </div>
        ) : (
          <Fragment>
            <div className="titleHeader">رزرو اتاق</div>

            <div
              className="user"
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/profile/${fare?.account?.token}`)}
            >
              <div className="username">{fare?.account?.name}</div>
              <div className="userImage">
                <img src={fare?.account?.image} className="BgError" alt="" />
                <span></span>
              </div>
            </div>
          </Fragment>
        )}
      </FareHeader>
      <FareMain
      // style={{ paddingBottom: width >= 640 ? "150px" : "0" }}
      >
        <div
          style={{
            overflow:
              !fare?.slides || fare?.slides?.length === 0 ? "hidden" : "unset",
            height:
              !fare?.slides || fare?.slides?.length === 0
                ? "fit-content"
                : "auto",
          }}
        >
          {l ? (
            <ProductImg height="330px" />
          ) : fare?.slides?.length > 1 ? (
            <Slider h={width >= 768 ? 300 : 240} ads slides={fare?.slides} />
          ) : fare?.slides?.length === 1 ? (
            <div style={{ position: "relative" }}>
              <img
                src={fare?.slides[0]?.image}
                alt=""
                style={{
                  width: "100%",
                  backgroundSize: "contain",
                }}
              />
              <div
                className=""
                style={{
                  width: "100%",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                  display: "flex",
                  height: "100%",
                }}
              />
            </div>
          ) : (
            <ErrorImg
              src="unknownSrc"
              alt=""
              className="BgError"
              style={{
                width: "100%",
                height: width >= 768 ? 300 : 240,
                transform: "scale(1.1)",
                backgroundSize: "contain",
                backgroundColor: "white",
              }}
            />
          )}
          <FareSubSlider />
        </div>
        <FareContent className="content">
          {!l ? (
            <div className="title">{fare?.rent?.title}</div>
          ) : (
            <SubSliderLoading title />
          )}
          {!l ? (
            <>
              <div style={{ position: "relative" }}>
                <Ripples
                  color="gray"
                  className="calendarPicker"
                  radius="0"
                  onClick={() => {
                    const calendarContainer =
                      document.getElementsByClassName("DatePicker__input")[0];
                    calendarContainer?.focus();
                  }}
                >
                  <div className="">
                    {hasChanged ? (
                      <Fragment>
                        {selectedDayRange?.to ? (
                          <Fragment>
                            <span>
                              {toPersian(
                                `${selectedDayRange?.to?.year}/${selectedDayRange?.to?.month}/${selectedDayRange?.to?.day}`
                              )}
                            </span>
                            <span> - </span>
                          </Fragment>
                        ) : (
                          " "
                        )}
                        <span>
                          {toPersian(
                            `${selectedDayRange?.from?.year}/${selectedDayRange?.from?.month}/${selectedDayRange?.from?.day}`
                          )}
                        </span>
                      </Fragment>
                    ) : (
                      <div>تاریخ ورود و خروج</div>
                    )}
                  </div>
                  <div>
                    <DateRangeIcon />
                  </div>
                </Ripples>
                <CalendarManage
                  specialHeight={height <= 437}
                  style={{
                    position: "absolute",
                    top: width <= 640 ? "40px" : "40px",
                    bottom: width <= 640 ? "53px" : "unset",
                    right: width <= 640 ? "unset" : "70%",
                    left: width <= 640 ? "50%" : "unset",
                    width: width <= 377 ? "100%" : "unset",
                    transform: width <= 377 ? "translate(-55px, 0px)" : "unset",
                    // opacity: open ? "1" : "0",
                    // pointerEvents: open ? "auto" : "none",
                    direction: "ltr",
                  }}
                  tabIndex="1"
                  id="calendarContainer"

                  // onBlur={() => setOpen(false)}
                >
                  <DatePicker
                    locale="fa"
                    value={selectedDayRange}
                    onChange={handleChange}
                    shouldHighlightWeekends
                    calendarClassName="responsive-calendar"
                    inputPlaceholder="Select a day range"
                  />
                </CalendarManage>
              </div>
            </>
          ) : (
            <FutureJobLoading />
          )}
          <AdsFeatures
            list={fare?.features}
            loading={l}
            datetime={fare?.rent?.datetime}
          />
          {!l ? (
            <>
              <div className="" style={{ marginTop: 15 }}>
                <ItemRow>
                  <div>قیمت روزانه</div>
                  <div>
                    <span>
                      {toPersian(
                        fare?.rent?.price_day?.toLocaleString("fa-IR")
                      )}
                    </span>{" "}
                    هزارتومان
                  </div>
                </ItemRow>

                {fare?.rent?.price_week && fare?.rent?.price_week !== null ? (
                  <ItemRow>
                    <div>قیمت هفتگی</div>
                    <div>
                      <span>
                        {toPersian(
                          fare?.rent?.price_week?.toLocaleString("fa-IR")
                        )}
                      </span>{" "}
                      هزارتومان
                    </div>
                  </ItemRow>
                ) : null}

                <ItemRow style={{ color: "#9e9e9e" }}>
                  <div>هزینه قابل پرداخت برای رزرو</div>
                  {hasChanged ? (
                    <div className="" style={{ marginTop: "4px" }}>
                      {toToman(
                        fare?.rent?.price_day *
                          Math.abs(
                            selectedDayRange?.from?.day -
                              selectedDayRange?.to?.day
                          )
                      )}
                    </div>
                  ) : (
                    <div>-------</div>
                  )}
                </ItemRow>
              </div>
              <AlertMsg>ابتدا تاریخ خود را وارد کنید سپس رزرو کنید</AlertMsg>
            </>
          ) : (
            <DescriptionLoading />
          )}
        </FareContent>
      </FareMain>
      <Submit
        type="submit"
        className={`${hasChanged ? "primary" : "acceptBtnMuted"}`}
      >
        <SubmitRipple
          onClick={handleSubmit}
          delay={300}
          delayAfterClick={300}
          radius="0"
        >
          رزرو و انتقال به درگاه پرداخت
        </SubmitRipple>
      </Submit>
    </Container>
  );
};
const CalendarManage = styled.div`
  & .DatePicker {
    position: absolute;
    bottom: 0;
    ${({ specialHeight }) =>
      specialHeight
        ? `
    z-index: 999;
    top: 200px;
    & >input {
      opacity: 0;
    pointer-events: none;
    }
    `
        : " "}
  }
`;
const SubmitRipple = styled(Ripples)`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Fare;
