import { useSelector } from "react-redux";
import AdsListItemsTemp from "./AdsListItemsTemp";

const AdsListItems = () => {
  let { ads } = useSelector(({ ads }) => ads);
  return <AdsListItemsTemp ads={ads} />;
};

export default AdsListItems;
