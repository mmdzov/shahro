/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useLabelName = (label, setLabelName) => {
  const { profile, account, followAccount } = useSelector(
    ({ account }) => account
  );
  const { guestName } = useSelector(({ _MainReducer }) => _MainReducer);

  useEffect(() => {
    let n = "";
    switch (label.mode) {
      case "ads": {
        n = "آگهی ها";
        break;
      }
      case "adsCats": {
        n = "انتخاب دسته";
        break;
      }
      case "ads-single": {
        n = "جزئیات آگهی";
        break;
      }
      case "rent": {
        n = "کرایه ها";
        break;
      }
      case "map": {
        n = "نقشه";
        break;
      }
      case "rentItem": {
        n = "کرایه";
        break;
      }
      case "category": {
        n = "دسته بندی";
        break;
      }
      case "categoryList": {
        n = "دسته بندی";
        break;
      }
      case (n = "session"): {
        n = "نشست های فعال";
        break;
      }
      case "adsComposeNew": {
        n = "افزودن آگهی";
        break;
      }
      case "adsComposeEdit": {
        n = "ویرایش آگهی";
        break;
      }
      case "adsComposeCat": {
        n = "انتخاب دسته";
        break;
      }
      case "followers": {
        n = `دنبال کنندگان ${followAccount.name ?? guestName}`;
        break;
      }
      case "followings": {
        n = `دنبال شوندگان ${followAccount.name ?? guestName}`;
        break;
      }
      case "notifications": {
        n = "اعلان ها";
        break;
      }
      case "profile": {
        n =
          profile?.account?.name && profile?.account?.name?.length > 0
            ? profile?.account?.name
            : "پروفایل";
        break;
      }
      case "features": {
        n = "مشخصات";
        break;
      }
      case "mediaSearch": {
        n = "جستجو در رسانه";
        break;
      }
      case "fareSearch": {
        n = "جستجو در کرایه";
        break;
      }
      case "addProduct": {
        n = "افزودن محصول";
        break;
      }
      case "editProduct": {
        n = "ویرایش محصول";
        break;
      }
      case "adsFilter": {
        n = "آگهی ها";
        break;
      }
      case "wallet": {
        n = "کیف پول";
        break;
      }
      case "adsSearch": {
        n = "جستجو در آگهی";
        break;
      }
      case "editPost": {
        n = "ویرایش مطلب";
        break;
      }
      case "adsOrder": {
        n = "آگهی من";
        break;
      }
      case "favorite": {
        n = "علاقه مندی ها";
        break;
      }
      case "movie": {
        n = "سینما";
        break;
      }
      case "addPost": {
        n = "افزودن مطلب جدید";
        break;
      }
      case "myPosts": {
        n = "مطالب من";
        break;
      }
      case "myProducts": {
        n = "محصولات من";
        break;
      }
      case "submitBasket": {
        n = "انتخاب آدرس و شیوه پرداخت";
        break;
      }
      default:
        return;
    }
    setLabelName(n);
  }, [account.name, label, profile?.account?.name, followAccount]);
};

export default useLabelName;
