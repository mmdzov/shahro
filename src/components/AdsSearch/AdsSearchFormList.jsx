/* eslint-disable react-hooks/exhaustive-deps */
import AdsListItemsTemp from "components/Ads/AdsListItemsTemp";
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import AdsContext from "context/AdsContext";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import EmptyBasket from "components/Basket/EmptyBasket";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AdsSearchFormList = () => {
  const { id } = useParams();
  const { search } = useSelector(({ ads }) => ads);
  const { loading, mounted: mount } = useContext(AdsContext);
  const [mountDialog, setMountDialog] = useState("");
  useEffect(() => {
    console.log(id, mount);
    if (search.length === 0 && mount) {
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
      {!loading && search.length === 0 ? (
        <EmptyBasket
          Icon={mount ? SearchSharpIcon : MoodBadIcon}
          title=" "
          msg={mountDialog}
          style={{ height: 480, borderTop: 0 }}
        />
      ) : (
        <AdsListItemsTemp ads={search} fromSearch />
      )}
    </>
  );
};

export default AdsSearchFormList;
