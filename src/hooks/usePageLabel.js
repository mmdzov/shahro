import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useLabelName from "./useLabelName";

const usePageLabel = () => {
  const [label, setLabel] = useState({ align: "", mode: "" });
  const [labelName, setLabelName] = useState("");
  useLabelName(label, setLabelName);
  const { token } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    let item = pathname.split("/");
    if (item.includes("ads-single"))
      setLabel({ mode: "ads-single", align: "right" });
    else if (
      item.includes("ads") &&
      item.includes("compose") &&
      /[0-9]/g.test(+item[3])
    ) {
      setLabel({ mode: "adsCats", align: "right" });
    } else if (item.includes("ads") && item.includes("category-list")) {
      setLabel({ mode: "categoryList", align: "center" });
    } else if (item.includes("ads") && item.includes("category"))
      setLabel({ mode: "category", align: "center" });
    else if (
      item.includes("ads") &&
      item.includes("compose") &&
      item.includes("edit")
    )
      setLabel({ mode: "adsComposeEdit", align: "right" });
    else if (item.includes("favorite"))
      setLabel({ mode: "favorite", align: "center" });
    else if (item.includes("cinema") && item.includes("movie") && token)
      setLabel({ mode: "movie", align: "center" });
    else if (item.includes("media") && item.includes("order"))
      setLabel({ mode: "myPosts", align: "right" });
    else if (item.includes("store") && item.includes("order"))
      setLabel({ mode: "myProducts", align: "right" });
    else if (
      item.includes("media") &&
      item.includes("compose") &&
      item.includes(token)
    )
      setLabel({ mode: "editPost", align: "right" });
    else if (item.includes("rent") && item.includes("search"))
      setLabel({ mode: "fareSearch", align: "right" });
    else if (item.includes("rent") && token)
      setLabel({ mode: "rentItem", align: "right" });
    else if (item.includes("rent")) setLabel({ mode: "rent", align: "center" });
    else if (item.includes("map")) setLabel({ mode: "map", align: "center" });
    else if (item.includes("media") && item.includes("compose"))
      setLabel({ mode: "addPost", align: "right" });
    else if (item.includes("ads") && item.includes("filter"))
      setLabel({ mode: "adsFilter", align: "right" });
    else if (item.includes("store") && item.includes("compose") && token)
      setLabel({ mode: "editProduct", align: "right" });
    else if (item.includes("store") && item.includes("compose"))
      setLabel({ mode: "addProduct", align: "right" });
    else if (
      item.includes("ads") &&
      item.includes("compose") &&
      item.length === 3
    )
      setLabel({ mode: "adsComposeCat", align: "right" });
    else if (
      item.includes("ads") &&
      item.includes("compose") &&
      item.includes("new") &&
      item.length === 4
    )
      setLabel({ mode: "adsComposeNew", align: "right" });
    else if (item.includes("followers"))
      setLabel({ mode: "followers", align: "right" });
    else if (item.includes("followings"))
      setLabel({ mode: "followings", align: "right" });
    else if (item.includes("ads") && item.includes("order"))
      setLabel({ mode: "adsOrder", align: "right" });
    else if (item.includes("wallet"))
      setLabel({ mode: "wallet", align: "right" });
    else if (item.includes("ads") && item.includes("search"))
      setLabel({ mode: "adsSearch", align: "right" });
    else if (item[1] === "notifications")
      setLabel({ mode: "notifications", align: "center" });
    else if (item[1] === "profile")
      setLabel({ mode: "profile", align: "center" });
    else if (item.includes("media") && item.includes("search"))
      setLabel({ mode: "mediaSearch", align: "right" });
    else if (item.includes("features"))
      setLabel({ mode: "features", align: "right" });
    else if (
      item.includes("store") &&
      item.includes("basket") &&
      item.includes("submit")
    )
      setLabel({ mode: "submitBasket", align: "right" });
    else if (item.includes("add") && item.includes("comments")) {
      setLabel({ mode: "addComment", align: "right" });
      return;
    } else if (item.includes("sessions")) {
      setLabel({ mode: "session", align: "right" });
    } else setLabel({ mode: "ads", align: "center" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return { label, labelName };
};

export default usePageLabel;
