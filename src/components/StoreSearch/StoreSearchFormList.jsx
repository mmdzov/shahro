/* eslint-disable react-hooks/exhaustive-deps */
import LodingDotPlus from "components/Utilities/Loadings/LoadingDotPlus";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyBasket from "components/Basket/EmptyBasket";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import StoreListItemsTemp from "../Store/StoreListItemsTemp";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import StoreContext from "context/StoreContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const StoreSearchFormList = () => {
  const { id } = useParams();
  const { search } = useSelector(({ product }) => product);
  const { loading, mounted: mount, setMounted } = useContext(StoreContext);
  const [mountDialog, setMountDialog] = useState("");
  useEffect(() => {
    console.log(id);
    if (!id || id?.length === 0 || mount) {
      setMounted(true);
      setMountDialog("لطفا چیزی که دنبال آن هستید را جستجو کنید.");
    } else if (!id || id?.length === 0) {
      console.log(id);
      setMountDialog("نتیجه ای یافت نشد");
    }
  }, [mount, id]);
  // if (l) return <LodingDotPlus isRelative={false} isFixed />;
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
        <StoreListItemsTemp store={search} fromSearch />
      )}
    </>
  );
};

export default StoreSearchFormList;
