/* eslint-disable no-unused-vars */
import { useHistory } from "react-router-dom";
import { ListContainer, ListItem, Content } from "../Ads/SearchListTemp.styled";
import ErrorImages from "components/Utilities/ErrorImages";
import toToman from "utilities/toToman";

const StoreListItemsTemp = ({ store, fromSearch = false }) => {
  const history = useHistory();
  return (
    <ListContainer>
      {store?.map((item) => (
        <ListItem
          className="adsCardBackgroundInfinity"
          // to={`/store/product/${item?.token}`}
          onClick={() =>
            history.push(`/store/product/${item?.token}`, {
              fromSearch,
              lastPosition: window.pageYOffset,
            })
          }
          key={item?.token}
        >
          <ErrorImages
            src={item?.image}
            width={100}
            height={100}
            sizeIcon="2.8rem"
            isRadius={1}
          />
          <Content>
            <div className="title">{item?.title}</div>
            <div
              className="flex-column"
              style={{ lineHeight: "20px", fontSize: ".8rem" }}
            >
              <div className="flex mb-1">
                {/* <span className="ml-2">قیمت : </span>{" "} */}
                <div
                  className="productPrice"
                  style={{
                    textDecoration:
                      item?.off && item.off > 0 ? "line-through" : "unset",
                  }}
                >
                  {toToman(item?.price)}
                </div>
              </div>
              {item?.off !== 0 && item?.off ? (
                <div className="flex">
                  {/* <span className="ml-1">تخفیف : </span>{" "} */}
                  <div className="productDiscount">{toToman(item?.off)}</div>
                </div>
              ) : null}
            </div>
          </Content>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default StoreListItemsTemp;
