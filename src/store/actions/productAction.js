import storeService from "api/storeService";
import handleApiErrors from "utilities/handleApiErrors";
import * as types from "./types";
import { clearAlert, clearErrMsg, setAlert, setErrMsg } from "./_MainAction";

export const setHomeProduct = (params) => ({
  type: types.SET_HOME_PRODUCT,
  payload: params,
});

export const setAllowToCreateProduct = (isAllow = false) => ({
  type: types.SET_ALLOW_TO_CREATE_PRODUCT,
  payload: isAllow,
});

export const setProductLoading = () => ({
  type: types.SET_PRODUCT_LOADING,
});

export const clearProductLoading = () => ({
  type: types.CLEAR_PRODUCT_LOADING,
});

export const setCategories = (cats) => ({
  type: types.SET_CATEGORIES,
  payload: cats,
});

export const clearSingleProduct = () => ({
  type: types.CLEAR_SINGLE_PRODUCT,
});

export const setInFeature = (ftr) => ({
  type: types.SET_IN_FEATURE,
  payload: ftr,
});

export const clearInFeature = () => ({
  type: types.CLEAR_IN_FEATURE,
});

export const setBasketCount = (count) => ({
  type: types.SET_BASKET_COUNT,
  payload: count,
});

export const setTotalPrice = (price) => ({
  type: types.SET_TOTAL_PRICE,
  payload: price,
});

export const setComments = (comments) => ({
  type: types.SET_COMMENTS,
  payload: comments,
});

export const clearOrders = () => ({
  type: types.SET_ORDERS,
  payload: {},
});

export const setStoreSearchItems = (item = []) => ({
  type: types.SET_STORE_SEARCH,
  payload: item,
});

export const setStoreSearchPage = (page) => ({
  type: types.SET_STORE_SEARCH_PAGE,
  payload: page,
});

export const setHasEndSearch = (isTrue = false) => ({
  type: types.HAS_END_SEARCH_STORE,
  payload: isTrue,
});

export const setNewAdsSearched = (params) => ({
  type: types.SET_NEW_STORE_SEARCH,
  payload: params,
});

export const setStoreSearch =
  (q, searchPage = 1) =>
  async (dispatch, getState) => {
    const { search, searched } = getState().product;
    // if (hasEndSearch) return;
    dispatch(clearErrMsg());
    // if (q !== searched) {
    // dispatch(setNewAdsSearched(q));
    // }
    try {
      const data = await storeService.storeSearch({
        searchPage,
        q,
      });
      handleApiErrors(data)
        .then(({ result }) => {
          console.log(result);
          if (searched === q) {
            if (searchPage === 1) {
              dispatch(setStoreSearchItems(result?.products ?? []));
            } else {
              const datas = [...search];
              datas.push(...(result?.products ?? ""));
              dispatch(setStoreSearchItems(datas));
            }
            dispatch(setStoreSearchPage(searchPage));
          } else {
            dispatch(setStoreSearchPage(1));
            dispatch(setStoreSearchItems(result?.products ?? []));
            dispatch(setNewAdsSearched(q));
          }
        })
        .catch((e) => {
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

export const setOrders = () => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await storeService.productOrder();
    handleApiErrors(data).then(
      ({ result, alert: { title, message: msg, has } }) => {
        if (has === 1) {
          dispatch(
            setAlert({ msg, title, has, mode: "setProductOrder", show: true })
          );
        }
        dispatch({ type: types.SET_ORDERS, payload: result });
      }
    );
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const reportProduct = (params) => async (dispatch) => {
  try {
    dispatch(clearAlert());
    const data = await storeService.reportProduct(params);
    handleApiErrors(data)
      .then(({ alert: { message: msg, has: code, title } }) => {
        dispatch(
          setAlert({ msg, code, title, mode: "reportProduct", show: true })
        );
      })
      .catch((e) => {
        dispatch(clearErrMsg());
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    console.log(e);
  }
};

export const addComment = (params, setModal) => async (dispatch, getState) => {
  dispatch(clearAlert());
  dispatch(clearErrMsg());
  const { single } = getState().product;
  try {
    dispatch(setProductLoading());
    const data = await storeService.submitComment(params);
    handleApiErrors(data)
      .then(({ result, alert: { title, message: msg, has } }) => {
        if (single && Object.keys(single)?.length > 0) {
          single.product.comments.unshift(result?.comment);
          const reversed = single.product.comments.reverse();
          single.product.comments = reversed;
          dispatch(setSingleProduct(single));
        }
        dispatch(clearProductLoading());
        if (has === 1) {
          dispatch(
            setAlert({ msg, title, mode: "addComment", has, show: true })
          );
        }
        setModal(false);
      })
      .catch((e) => {
        setModal(false);
        dispatch(clearProductLoading());
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    setModal(false);
    console.log(e);
    // throw new Error(e);
  }
};

export const reportComment = (params) => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await storeService.reportComment(params);
    handleApiErrors(data)
      .then(({ alert }) => {
        dispatch(
          setAlert({
            msg: alert.message,
            title: alert.title,
            has: alert.has,
            mode: "reportComment",
            show: true,
          })
        );
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
        dispatch(
          setAlert({
            msg: alert.message,
            title: alert.title,
            has: alert.has,
            mode: "reportComment",
            show: true,
          })
        );
      });
  } catch (e) {
    console.log(e);
  }
};

export const setLikeComment = (params) => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  const {
    comments: { comments },
  } = getState().product;
  try {
    const index = comments.findIndex((item) => item.token === params.comment);
    const current = comments[index];
    current.likeMe = params?.value;
    current.like = params?.value === 1 ? current.like + 1 : current.like - 1;
    dispatch({ type: types.SET_LIKE_COMMENT, payload: comments });
    const data = await storeService.setLikeComment(params);
    handleApiErrors(data)
      .then(({ result, alert }) => {
        if (alert.has === 1) {
          dispatch(
            setAlert({
              mode: "commentLike",
              show: true,
              has: 1,
              msg: alert.message,
              title: alert.title,
            })
          );
        }
      })
      .catch((e) => {
        if (e.has === 1) {
          dispatch(
            setAlert({
              mode: "commentLike",
              show: true,
              has: 1,
              msg: e.message,
              title: e.title,
            })
          );
        }
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    console.log(e);
  }
};

export const getComments = (token) => async (dispatch, getState) => {
  try {
    const data = await storeService.getComments(token);
    handleApiErrors(data)
      .then(({ result }) => {
        dispatch(setComments(result));
      })
      .catch((e) => {
        console.log(e);
        dispatch(clearErrMsg());
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    console.log(e);
  }
};

export const clearBasket = (setModal) => async (dispatch) => {
  try {
    const data = await storeService.clearBasket();
    handleApiErrors(data)
      .then(({ result }) => {
        dispatch({ type: types.CLEAR_BASKET });
        dispatch(setBasketCount(0));
        dispatch(setTotalPrice(0));
        setModal(false);
      })
      .catch((e) => {
        console.log(e);
        dispatch(clearErrMsg());
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    console.log(e);
  }
};

export const changeBasketCount =
  (datetime, mode) => async (dispatch, getState) => {
    let { basket, totalPrice } = getState().product;
    const index = basket.findIndex((item) => item.datetime === datetime);
    const item = basket[index];
    const isOff = item.off ? item.off : item.price;
    if (mode === "inc") {
      item.count += 1;
      item.totalPrice += isOff;
      dispatch(setTotalPrice((totalPrice += isOff)));
    } else {
      if (item.count === 1) {
        item.totalPrice = isOff;
      } else {
        item.count -= 1;
        item.totalPrice -= isOff;
        dispatch(setTotalPrice((totalPrice -= isOff)));
      }
    }
    await dispatch(
      addToBasket(
        {
          product: item?.token,
          color: item?.color?.token ?? null,
          size: item?.size?.token ?? null,
          value: item?.count,
        },
        true
      )
    );
    await dispatch({ type: types.CHANGE_BASKET_COUNT, payload: basket });
  };

const setBasketDetails = (details) => ({
  type: types.SET_BASKET_DETAILS,
  payload: details,
});

export const setDiscount = (params = { code: "0", value: 0, type: 0 }) => ({
  type: types.SET_DISCOUNT,
  payload: params,
});

export const setBasketDiscount = (code) => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await storeService.setDiscount({ code });
    handleApiErrors(data)
      .then(({ result: { code, value, type }, alert }) => {
        dispatch(setDiscount({ code, value, type }));
        dispatch(
          setAlert({
            msg: alert.message,
            title: alert.title,
            has: alert.has,
            mode: "discountCode",
            show: true,
          })
        );
      })
      .catch((e) => {
        dispatch(
          setAlert({
            msg: e.message,
            title: e.title,
            has: e.has,
            mode: "discountCode",
            show: true,
          })
        );
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const getBasket = () => async (dispatch) => {
  try {
    dispatch(setProductLoading());
    const data = await storeService.getBasket();
    handleApiErrors(data)
      .then(({ result, alert }) => {
        let totalPrice = 0;
        result.products.reduce((_prev, init) => {
          const isOff = init?.off ? init?.off : init?.price;
          return (totalPrice += isOff * init.count);
        }, 0);
        const modified = result.products.map((item) => {
          if (item?.off) item.totalPrice = item?.off * item.count;
          else item.totalPrice = item.price * item.count;
          return item;
        });
        dispatch(setBasketDetails(result));
        dispatch({ type: types.GET_BASKET, payload: modified });
        dispatch(setTotalPrice(totalPrice));
        dispatch(clearProductLoading());
        if (alert.has === 1) {
          dispatch(
            setAlert({
              msg: alert.message,
              title: alert.title,
              has: alert.has,
              mode: "emptyBasket",
              show: true,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(clearProductLoading());
        dispatch(clearErrMsg());
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(clearProductLoading());
    console.log(e);
  }
};

export const removeBasketItem = (params) => async (dispatch, getState) => {
  const { basket } = getState().product;
  try {
    const data = await storeService.addToBasket(params);
    handleApiErrors(data)
      .then(({ result, alert: { title, message: msg, has } }) => {
        const filteredBasket = basket.filter(
          (item) => item.token !== params?.product
        );
        dispatch({
          type: types.GET_BASKET,
          payload: filteredBasket,
        });
        if (has === 1) {
          dispatch(
            setAlert({
              msg,
              title,
              has,
              mode: "removeBasketItem",
              show: true,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          setAlert({
            msg: e.message,
            title: e.title,
            has: e.has,
            mode: "removeBasketItem",
            show: true,
          })
        );
        dispatch(clearErrMsg());
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    console.log(e);
  }
};
export const addToBasket =
  (params, isUpdate = false) =>
  async (dispatch) => {
    try {
      const data = await storeService.addToBasket(params);
      handleApiErrors(data)
        .then(({ result, alert: { title, message: msg, has }, alert }) => {
          if (has === 1) {
            // TODO: Please modify this block!
            dispatch(
              setAlert({
                msg,
                title,
                has,
                mode: "addBasketItem",
                show: true,
              })
            );
          }
          if (!isUpdate) {
            dispatch({
              type: types.SET_BASKET_COUNT,
              payload: result?.inBasketCount,
            });
            if (has === 1) {
              dispatch(
                setAlert({
                  msg,
                  title,
                  has,
                  mode: "changeBasketCount",
                  show: true,
                })
              );
            }
          }
        })
        .catch((e) => {
          dispatch(clearErrMsg());
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      console.log(e);
    }
  };

export const setProductLike =
  (token, check, setLike = () => {}) =>
  async (dispatch, getState) => {
    const { single } = getState().product;
    try {
      const data = await storeService.setLike({
        product: token,
        value: single?.product?.likeMe ? 0 : 1,
      });
      handleApiErrors(data)
        .then(({ result, alert: { message: msg, title, has } }) => {
          single.product.likeMe = result.liked;
          dispatch({ type: types.SET_LIKE, payload: single });
          setLike((prev) => !prev);
          if (has === 1) {
            dispatch(
              setAlert({
                msg,
                title,
                has,
                mode: "productLike",
                show: true,
              })
            );
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch(clearErrMsg());
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      console.log(e);
    }
  };

export const setAdsSlider = (params) => ({
  type: types.SET_ADS_SLIDER,
  payload: params,
});

export const setLastProductPosition = (position) => ({
  type: types.GET_LAST_PRODUCT_POSITION,
  payload: position,
});

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setProductLoading());
    const data = await storeService.getProducts();
    handleApiErrors(data)
      .then(
        ({
          result: {
            categories,
            sliders,
            inBasketCount,
            adsSliders,
            allowToCreate,
          },
        }) => {
          dispatch(setAdsSlider(adsSliders));
          dispatch({ type: types.SET_PRODUCTS, payload: sliders });
          dispatch(setCategories(categories));
          dispatch(setBasketCount(inBasketCount));
          dispatch(setAllowToCreateProduct(allowToCreate));
          dispatch(clearProductLoading());
        }
      )
      .catch((e) => {
        dispatch(clearProductLoading());
        dispatch(clearErrMsg());
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    console.log(e);
    // throw new Error(e);
  }
};

export const setSingleCat = (cat, history) => async (dispatch) => {
  try {
    dispatch(setProductLoading());
    const data = await storeService.getSingleCat(cat);
    handleApiErrors(data)
      .then(({ result: { sliders, categories, adsSliders }, result }) => {
        dispatch(setAdsSlider(adsSliders));
        dispatch(setCategories(categories));
        dispatch({ type: types.SET_SINGLE_CAT, payload: sliders });
        dispatch(clearProductLoading());
      })
      .catch((e) => {
        history.replace("/store");
        dispatch(clearProductLoading());
        dispatch(clearErrMsg());
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    console.log(e);
  }
};

export const setMyProducts = (product = []) => ({
  type: types.SET_MY_PRODUCTS,
  payload: product,
});

export const getMyProducts = () => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await storeService.getMyPostList();
    handleApiErrors(data)
      .then(({ result: { orders, allowToCreate }, alert }) => {
        if (orders) {
          dispatch(setMyProducts(orders));
        }
        dispatch(setAllowToCreateProduct(allowToCreate));
        if (alert.has === 1) {
          dispatch(
            setAlert({
              mode: "myProducts",
              show: true,
              title: alert.title,
              msg: alert.message,
              has: alert.has,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          setAlert({
            mode: "myProductsError",
            show: true,
            title: e.title,
            msg: e.message,
            has: e.has,
          })
        );
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};

export const setProduct = (result = {}) => ({
  type: types.SET_SINGLE_PRODUCT,
  payload: result,
});

export const setCommentForm = (commentForm = {}) => ({
  type: types.SET_COMMENT_FORM,
  payload: commentForm,
});

export const getCommentItem = (token) => async (dispatch, getState) => {
  dispatch(clearErrMsg());
  try {
    const data = await storeService.getCommentItem(token);
    handleApiErrors(data)
      .then(({ result, alert: { title, message: msg, has } }) => {
        console.log(result);
        dispatch(setCommentForm(result));
        if (has === 1) {
          dispatch(
            setAlert({
              msg,
              title,
              has,
              mode: "commentItem",
              show: true,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
        dispatch(
          setAlert({
            msg: e.message,
            title: e.title,
            has: e.has,
            mode: "commentItem",
            show: true,
          })
        );
      });
  } catch (e) {
    console.log(e);
    // throw new Error(e);
  }
};

export const setSingleProduct = (token) => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    dispatch(setProductLoading());
    const data = await storeService.getSingleProduct(token);
    handleApiErrors(data)
      .then(({ result, alert: { title, message: msg, has } }) => {
        const reversed = result.product.comments.reverse();
        result.product.comments = reversed;
        dispatch(setProduct(result));
        dispatch(setBasketCount(result?.inBasketCount));
        dispatch(clearProductLoading());
        if (has === 1) {
          dispatch(
            setAlert({
              msg,
              title,
              has,
              mode: "singleProduct",
              show: true,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
        dispatch(
          setAlert({
            msg: e.message,
            title: e.title,
            has: e.has,
            mode: "singleProduct",
            show: true,
          })
        );
      });
  } catch (e) {
    console.log(e);
    // throw new Error(e);
  }
};
export const setSingleEditProduct = (token) => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    dispatch(setProductLoading());
    const data = await storeService.getSingleEditProduct(token);
    handleApiErrors(data)
      .then(({ result, alert: { title, message: msg, has } }) => {
        dispatch({ type: types.SET_SINGLE_PRODUCT, payload: result });
        dispatch(clearProductLoading());
        if (has === 1) {
          dispatch(
            setAlert({
              msg,
              title,
              has,
              mode: "singleProduct",
              show: true,
            })
          );
        }
      })
      .catch((e) => {
        dispatch(setErrMsg(e));
        dispatch(
          setAlert({
            msg: e.message,
            title: e.title,
            has: e.has,
            mode: "singleProduct",
            show: true,
          })
        );
      });
  } catch (e) {
    console.log(e);
    // throw new Error(e);
  }
};

export const submitBasketSend =
  (payment, redirect = () => {}, loading) =>
  async (dispatch, getState) => {
    const { discount } = getState().product;
    dispatch(clearErrMsg());
    try {
      const data = await storeService.submitBasketSend({
        payment,
        code: (discount?.code !== "0") | discount?.code ? discount?.code : null,
      });
      handleApiErrors(data)
        .then(({ result }) => {
          loading(false);
          redirect(result?.order);
        })
        .catch((e) => {
          dispatch(
            setAlert({
              msg: e.message,
              title: e.title,
              has: e.has,
              mode: "submitBasketSendError",
              show: true,
            })
          );
          dispatch(setErrMsg(e));
        });
    } catch (e) {
      dispatch(setErrMsg(e));
    }
  };

export const setSingleOrder = (order = {}) => ({
  type: types.SET_SINGLE_ORDER,
  payload: order,
});

export const getSingleOrder = (token) => async (dispatch) => {
  dispatch(clearErrMsg());
  try {
    const data = await storeService.productOrderSingle(token);
    handleApiErrors(data)
      .then(({ result, alert }) => {
        dispatch(setSingleOrder(result));
        if (alert.has === 1) {
          dispatch(
            setAlert({
              msg: alert.message,
              title: alert.title,
              has: alert.has,
              mode: "singleOrder",
              show: true,
            })
          );
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          setAlert({
            msg: e.message,
            title: e.title,
            has: e.has,
            mode: "singleOrderError",
            show: true,
          })
        );
        dispatch(setErrMsg(e));
      });
  } catch (e) {
    dispatch(setErrMsg(e));
  }
};
