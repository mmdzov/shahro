/* eslint-disable react-hooks/exhaustive-deps */
import AdsListItemsTemp from "components/Ads/AdsListItemsTemp";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { useContext, useState } from "react";
import EmptyBasket from "components/Basket/EmptyBasket";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreListItemsTemp from "components/Store/StoreListItemsTemp";

const SearchTemplateList = ({ list = [], context: Context, mode }) => {
  const { id } = useParams();
  const { loading, mounted: mount } = useContext(Context);
  const [mountDialog, setMountDialog] = useState("");
  useEffect(() => {
    console.log(id, mount);
    if (list?.length === 0 && mount) {
      setMountDialog("لطفا چیزی که دنبال آن هستید را جستجو کنید.");
    } else {
      setMountDialog("نتیجه ای یافت نشد");
    }
  }, [mount, id]);
  return (
    <>
      {loading ? (
        <LodingDotPlus isRelative={false} isFixed isBg={false} />
      ) : null}
      {!loading && list?.length === 0 ? (
        <EmptyBasket
          Icon={mount ? SearchSharpIcon : "Error"}
          title=" "
          msg={mountDialog}
          style={{ height: 480, borderTop: 0 }}
        />
      ) : (
        <>
          {mode === "ads" || mode === "media" || mode === "fare" ? (
            <AdsListItemsTemp ads={list} fromSearch />
          ) : mode === "store" ? (
            <StoreListItemsTemp store={list} fromSearch />
          ) : null}
        </>
      )}
    </>
  );
};

export default SearchTemplateList;
