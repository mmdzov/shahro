/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import GeneralAlert from "components/Utilities/GeneralAlert";
import Home from "page/Home/Home";
import Post from "page/Post/Post";
import Media from "page/Media/Media";
import Events from "page/Events/Events";
import Login from "page/Login/Login";
import Verification from "page/Login/Verification";
import PrivateRoute from "routes/PrivateRoute";
import { closeAlert, showSplashAction } from "store/actions/generalActions";
import Store from "page/Store/Store";
import StoreCategory from "components/Store/StoreCategory";
import StoreLayout from "layouts/StoreLayout";
import Product from "page/Store/Product";
import ProductFeatures from "components/Store/ProductFeatures";
import Basket from "page/Basket/Basket";
import Comments from "page/Store/Comments";
import AddComment from "page/Store/AddComment";
import Ads from "page/Ads/Ads";
import AdsLayout from "layouts/AdsLayout";
import AdsCats from "page/Ads/AdsCats";
import AdsSingle from "page/Ads/AdsSignle";
import AdsCategory from "page/Ads/AdsCategory";
import BuyCredit from "components/BuyCredit/BuyCredit";
import Bill from "components/Bill/Bill";
import Settings from "page/Settings/Settings";
import SettingsEdit from "page/Settings/SettingsEdit";
import Sessions from "page/Sessions/Sessions";
import { Redirect, useLocation } from "react-router-dom";
import ProductOrder from "page/Settings/ProductOrder";
import Notifications from "page/Notifications/Notifications";
import Profile from "page/Profile/Profile";
import Followers from "page/Followers/Followers";
import Followings from "page/Followers/Followings";
import AddPost from "page/AddPost/AddPost";
import { useEffect } from "react";
import SubmitBasket from "page/SubmitBasket/SubmitBasket";
import BasketLocation from "page/BasketLocation/BasketLocation";
import Order from "page/Order/Order";
import AddProduct from "page/AddProduct/AddProduct";
import AddAds from "page/AddAds/AddAds";
import ProfileWrapper from "./ProfileWrapper";
import MediaWrapper from "./MediaWrapper";
import StoreWrapper from "./StoreWrapper";
import AdsWrapper from "./AdsWrapper";
import AdsSearch from "page/AdsSearch/AdsSearch";
import StoreSearch from "page/StoreSearch/StoreSearch";
import AdsOrder from "page/AdsOrder/AdsOrder";
import ConditionalRoute from "routes/ConditionalRoute";
import MediaOrder from "page/MediaOrder/MediaOrder";
import StoreOrder from "page/StoreOrder/StoreOrder";
import AuthAlert from "components/Utilities/AuthAlert";
import Wallet from "page/Wallet/Wallet";
import Favorite from "page/Favorite/Favorite";
import Movie from "page/Cinema/Movie";
import PreviewProfile from "page/Previews/PreviewProfile";
import Direct from "page/Direct/Direct";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { changePath, setPath } from "store/actions/pathAction";
import withManageRoutes from "HOC/withManageRoutes";
import Fares from "page/Fares/Fares";
import Fare from "page/Fares/Fare";
import Map from "page/Map/Map";
import { clearAlert } from "store/actions/_MainAction";
import LoginWrapper from "./LoginWrapper";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import FareWrapper from "./FareWrapper";
import MediaSearch from "page/MediaSearch/MediaSearch";
import FareSearch from "page/FareSearch/FareSearch";
import AdsSubCategory from "page/Ads/AdsSubCategory";

const Mireseh = () => {
  const {
    general: { openAlert, alert },
    _MainReducer: { alert: notifAlert, loading },
    path: { prevPaths },
  } = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (prevPaths.length === 0) {
      dispatch(setPath(location));
    }
  }, [prevPaths, history, location]);
  useEffect(() => {
    history.listen((e) => {
      const ss = window.sessionStorage;
      if (e.pathname === "/") {
        dispatch(changePath());
        // ss.clear();
      } else {
        ss.setItem("pathChanged", true);
        dispatch(setPath(e));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  useEffect(() => {
    if (openAlert) {
      setTimeout(() => {
        dispatch(closeAlert());
      }, 2600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAlert]);
  useEffect(() => {
    let si = setTimeout(() => {
      dispatch(showSplashAction());
    }, 2000);
    return () => clearTimeout(si);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Switch>
      <Switch>
        <Route path={["/login", "/verification"]} exact>
          <LoginWrapper>
            <Route path="/login" exact component={Login} />
            <ConditionalRoute
              path="/verification"
              exact
              component={Verification}
            />
          </LoginWrapper>
        </Route>

        {/* private routes */}
        <PrivateRoute path="/events" component={Events} />
        <PrivateRoute path="/events/:year/:month/:day" component={Events} />
        <PrivateRoute path="/buy-credit" component={BuyCredit} />
        <PrivateRoute path="/bill" component={Bill} />
        <PrivateRoute path="/setting" exact component={Settings} />
        <PrivateRoute path="/store/compose" exact component={AddProduct} />
        <PrivateRoute
          path="/store/compose/:token"
          exact
          component={AddProduct}
        />
        <PrivateRoute path="/media/compose" exact component={AddPost} />
        <PrivateRoute path="/media/compose/:token" exact component={AddPost} />
        <Route path={["/store/order"]} exact>
          <AdsLayout>
            <PrivateRoute exact path="/store/order" component={StoreOrder} />
          </AdsLayout>
        </Route>
        <Route path={["/media/order"]} exact>
          <AdsLayout>
            <PrivateRoute exact path="/media/order" component={MediaOrder} />
          </AdsLayout>
        </Route>
        <PrivateRoute path={["/media/search", "/media/search/:id"]} exact>
          <AdsLayout>
            <MediaWrapper>
              <PrivateRoute
                exact
                path="/media/search"
                component={MediaSearch}
              />
              <PrivateRoute
                exact
                path="/media/search/:id"
                component={MediaSearch}
              />
            </MediaWrapper>
          </AdsLayout>
        </PrivateRoute>
        <PrivateRoute
          path={["/media/:cats", "/media/post/:token", "/media"]}
          exact
        >
          <MediaWrapper>
            <Route exact path="/media/:cats" component={Media} />
            <Route path="/media/post/:token" component={Post} />
            <Route exact path="/media" component={Media} />
          </MediaWrapper>
        </PrivateRoute>
        <Route
          path={[
            "/store/basket/submit",
            "/store/basket/submit/locations",
            "/wallet",
          ]}
          exact
        >
          <AdsLayout>
            <PrivateRoute path="/wallet" exact component={Wallet} />
            <PrivateRoute
              path="/store/basket/submit"
              exact
              component={SubmitBasket}
            />
            <PrivateRoute
              path="/store/basket/submit/locations"
              exact
              component={BasketLocation}
            />
          </AdsLayout>
        </Route>
        <Route
          path={[
            "/profile/:token/followers",
            "/profile/:token/followings",
            "/favorite",
          ]}
          exact
        >
          <AdsLayout>
            <PrivateRoute path="/favorite" component={Favorite} exact />
            <PrivateRoute
              path="/profile/:token/followers"
              exact
              component={Followers}
            />
            <PrivateRoute
              path="/profile/:token/followings"
              exact
              component={Followings}
            />
          </AdsLayout>
        </Route>
        <PrivateRoute path={["/profile/:id"]} exact>
          <ProfileWrapper>
            <AdsLayout>
              <Route path="/profile/:id" exact component={Profile} />
            </AdsLayout>
          </ProfileWrapper>
        </PrivateRoute>
        <PrivateRoute path="/setting/edit" exact component={SettingsEdit} />
        <Route path={["/notifications", "/notifications/:links"]} exact>
          <AdsLayout>
            <PrivateRoute
              path="/notifications"
              exact
              component={Notifications}
            />
            <PrivateRoute
              path="/notifications/:links"
              exact
              component={Notifications}
            />
          </AdsLayout>
        </Route>
        <Route exact path={["/setting/sessions"]}>
          <AdsLayout>
            <PrivateRoute path="/setting/sessions" exact component={Sessions} />
          </AdsLayout>
        </Route>

        <Route exact path={["/map"]}>
          <AdsLayout>
            <PrivateRoute path="/map" exact component={Map} />
          </AdsLayout>
        </Route>

        <Route exact path={["/cinema/movie/:token"]}>
          <AdsLayout>
            <PrivateRoute path="/cinema/movie/:token" exact component={Movie} />
          </AdsLayout>
        </Route>

        <PrivateRoute
          path="/preview/profile/:token"
          exact
          component={PreviewProfile}
        />

        <PrivateRoute path="/chat" exact component={Direct} />

        <Route path={["/rent/search", "/rent/search/:id"]} exact>
          <AdsLayout>
            <FareWrapper>
              <PrivateRoute
                path={"/rent/search"}
                exact
                component={FareSearch}
              />
              <PrivateRoute
                path={"/rent/search/:id"}
                exact
                component={FareSearch}
              />
            </FareWrapper>
          </AdsLayout>
        </Route>

        <Route path={["/rent", "/rent/:token"]} exact>
          <AdsLayout>
            <FareWrapper>
              <PrivateRoute path="/rent" exact component={Fares} />
              <PrivateRoute path="/rent/:token" exact component={Fare} />
            </FareWrapper>
          </AdsLayout>
        </Route>

        <PrivateRoute path="/order" exact component={ProductOrder} />
        <PrivateRoute path="/order/:token" exact component={Order} />
        <PrivateRoute
          exact
          path={[
            "/ads/category-list/:token",
            "/ads",
            "/ads/categories",
            "/ads/ads-single/:token",
            "/ads/category",
            "/ads/category/:token",
            "/store/product/features/:token",
            "/ads/search",
            "/ads/search/:id",
            "/ads/compose",
            "/ads/order",
            "/ads/compose/new",
            "/ads/compose/:category",
            "/ads/filter/:adsId",
            "/ads/compose/edit/:token",
          ]}
        >
          <AdsLayout>
            <AdsWrapper>
              <Route exact path="/ads/compose/new" component={AddAds} />
              <Route exact path="/ads/compose/edit/:token" component={AddAds} />
              <Route exact path="/ads/compose" component={AdsCats} />
              <Route exact path="/ads/compose/:category" component={AdsCats} />
              <Route
                exact
                path="/ads/category-list/:token"
                component={AdsSubCategory}
              />
              <Route exact path="/ads/search" component={AdsSearch} />
              <Route exact path="/ads/search/:id" component={AdsSearch} />
              <Route exact path="/ads" component={Ads} />
              <Route exact path="/ads/filter/:adsId" component={Ads} />
              <Route
                exact
                path="/ads/ads-single/:token"
                component={AdsSingle}
              />
            </AdsWrapper>

            <PrivateRoute exact path="/ads/order" component={AdsOrder} />
            <PrivateRoute exact path="/ads/category" component={AdsCategory} />
            <PrivateRoute
              exact
              path="/ads/category/:token"
              component={AdsCategory}
            />
            <PrivateRoute
              exact
              path="/store/product/features/:token"
              component={ProductFeatures}
            />
          </AdsLayout>
        </PrivateRoute>
        <Route
          exact
          path={[
            "/store/basket",
            "/store/comments/:token",
            "/store/comments/add/:token",
          ]}
        >
          <StoreLayout>
            <PrivateRoute exact path="/store/basket" component={Basket} />
            <PrivateRoute
              exact
              path="/store/comments/:token"
              component={Comments}
            />
            <PrivateRoute
              exact
              path="/store/comments/add/:token"
              component={AddComment}
            />
          </StoreLayout>
        </Route>

        <PrivateRoute exact path={["/store/search", "/store/search/:id"]}>
          <StoreWrapper>
            <StoreLayout>
              <Switch>
                <PrivateRoute
                  exact
                  path="/store/search"
                  component={StoreSearch}
                />

                <PrivateRoute
                  exact
                  path="/store/search/:id"
                  component={StoreSearch}
                />
              </Switch>
            </StoreLayout>
          </StoreWrapper>
        </PrivateRoute>

        <PrivateRoute
          exact
          path={["/store/:cats", "/store/product/:token", "/store"]}
        >
          <StoreWrapper>
            <StoreLayout>
              <Switch>
                <PrivateRoute
                  exact
                  path="/store/:cats"
                  component={StoreCategory}
                />
              </Switch>

              <Switch>
                <PrivateRoute
                  exact
                  path="/store/product/:token"
                  component={Product}
                />
              </Switch>
              <PrivateRoute exact path="/store" component={Store} />
            </StoreLayout>
          </StoreWrapper>
        </PrivateRoute>
        <PrivateRoute exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
      {notifAlert?.code === 404 ? (
        <AuthAlert alert={{ message: notifAlert.msg, title: " " }} />
      ) : null}
      {alert !== null ? <GeneralAlert alert={alert} /> : null}
    </Switch>
  );
};

export default withManageRoutes(Mireseh);
