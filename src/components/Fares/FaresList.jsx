import { ListItemContainer } from "components/SlideTemp/SlideTemp.styled";
import SlideTempList from "components/SlideTemp/SlideTempList";
import { memo } from "react";
import { useSelector } from "react-redux";
// import Logo from "assets/imgs/logo.png";
import FaresItem from "./FaresItem";

const FaresList = () => {
  const { homeFares: list } = useSelector(({ fare }) => fare);
  console.log(list);
  return (
    <SlideTempList height="348px">
      {list?.map(({ token, image, title, subtitle, props2, error }) => (
        <ListItemContainer key={token} borderRight="5px">
          <FaresItem
            style={{ marginRight: "10px", marginLeft: 0 }}
            borderunset="1px solid #f1eae2"
            key={token}
            to={`/rent/${token}`}
            id={token}
            hasHomeFareItem
            img={image}
            title={title}
            location={subtitle}
          />
        </ListItemContainer>
      ))}
    </SlideTempList>
  );
};
export default memo(FaresList);
