import { TabContainer, TabItem } from "./Favorite.styled";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import { useHistory, useLocation } from "react-router-dom";
import HomeWorkIcon from "@material-ui/icons/HomeWork";

const FavoriteTab = ({ mode }) => {
  const history = useHistory();
  const { state } = useLocation();
  return (
    <TabContainer className="toolbarBackground">
      <TabItem
        onClick={() =>
          history.replace("/favorite", { mode: "ads", from: state?.from })
        }
        className={`tabItem ${mode === "ads" ? "active" : ""}`}
      >
        <ShoppingBasketIcon />
        <div className="">اگهی</div>
      </TabItem>
      <TabItem
        onClick={() =>
          history.replace("/favorite", { mode: "posts", from: state?.from })
        }
        className={`tabItem ${mode === "posts" ? "active" : ""}`}
      >
        <AllInboxIcon />
        <div className="">مطالب</div>
      </TabItem>
      <TabItem
        onClick={() =>
          history.replace("/favorite", { mode: "products", from: state?.from })
        }
        className={`tabItem ${mode === "products" ? "active" : ""}`}
      >
        <LocalGroceryStoreIcon />
        <div className="">فروشگاه</div>
      </TabItem>
      <TabItem
        onClick={() =>
          history.replace("/favorite", { mode: "rents", from: state?.from })
        }
        className={`tabItem ${mode === "rents" ? "active" : ""}`}
      >
        <HomeWorkIcon />
        <div className="">کرایه</div>
      </TabItem>
    </TabContainer>
  );
};

export default FavoriteTab;
