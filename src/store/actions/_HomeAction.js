import mainService from "api/mainService";
import { setAllowToCreate, setLoading } from "./_MainAction";
import {
  clearCalLoading,
  setCalLoading,
  setHomeCalendar,
} from "./calendarActions";
import {
  clearProductLoading,
  setHomeProduct,
  setProductLoading,
} from "./productAction";
import { clearAdsLoading, setAdsLoading, setHomeAds } from "./adsAction";
import {
  clearLoadingMedia,
  setHomeMedia,
  setLoadingMedia,
} from "./mediaActions";
import handleApiErrors from "utilities/handleApiErrors";
import { getHomeAccounts, setAccount, setloadingAcc } from "./accountAction";
import { setHomeCinema, setLoadingCinema } from "./cinemaAction";
import * as types from "./types";
import { setFareLoading, setHomeFare } from "./fareAction";
export const getAllHomeData =
  (history, state) => async (dispatch, getState) => {
    const { sessionID, authID } = getState().auth;
    try {
      const d = dispatch;
      // d(setLoading("homeLoading", false));
      d(setLoadingMedia());
      d(setCalLoading());
      d(setloadingAcc(true));
      d(setProductLoading());
      d(setAdsLoading());
      d(setLoadingCinema(true));
      d(setFareLoading(true));
      let data;
      if (state?.auth && state?.session) {
        data = await mainService.getMainDataFirstTime(
          state?.auth,
          state?.session
        );
      } else if (sessionID && authID) {
        data = await mainService.getMainDataFirstTime(authID, sessionID);
      } else {
        data = await mainService.getMainData();
      }
      handleApiErrors(data)
        .then(
          ({
            result: {
              calendars,
              posts,
              products,
              ads,
              account,
              shows,
              accounts,
              rents,
            },
            result,
          }) => {
            let cinemaModify = shows.map((item) => {
              item.error = false;
              item.id = ~~(Math.random() * 9999999);
              return item;
            });
            d(setHomeFare(rents));
            d(setHomeCalendar(calendars));
            d(setHomeProduct(products));
            d(setHomeMedia(posts));
            d(setHomeCinema(cinemaModify));
            d(setHomeAds(ads));
            d(setAccount(account));

            const getAccounts = accounts.map((item) => {
              item.error = true;
              return item;
            });
            d(getHomeAccounts(getAccounts));
            d({ type: types.ADD_PROFILE_IMAGE, payload: account?.image });
            d(setAllowToCreate(result.allowToCreate));
            d(clearLoadingMedia());
            d(clearCalLoading());
            d(clearAdsLoading());
            d(setFareLoading(false));
            d(clearProductLoading());
            d(setloadingAcc());
            d(setLoadingCinema());
            d(setLoading("", false));
          }
        )
        .catch((err) => {
          d(clearLoadingMedia());
          d(clearCalLoading());
          d(clearAdsLoading());
          d(clearProductLoading());
          d(setCalLoading());
          d(setloadingAcc());
          d(setLoadingCinema());
          d(setLoading("", false));
          // d(clearErrMsg());
          // setErrMsg(err);
        });
    } catch (e) {
      console.log(e);
      // throw new Error(e);
    }
  };
