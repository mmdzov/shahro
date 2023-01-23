import { ButtonBase } from "@material-ui/core";
import { Scroll } from "components/SlideTemp/SlideTemp.styled";
import useGetTheme from "hooks/useGetTheme";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import isMobileDevice from "utilities/isMobileDevices";

const MenuTemp = ({ list, label }) => {
  const { colors } = useGetTheme();
  return (
    <MenuTempWrapper className="menuTemp" MobileDevice={isMobileDevice()}>
      {list.map(({ name, token }) => (
        <MenuTempParent key={token || ~~(Math.random() * 9999999)}>
          <ButtonBase
            style={{ width: "100%", height: "100%", padding: "0 10px" }}
          >
            <MenuTempItem
              to={token ? `/${label}/${token}` : `/${label}`}
              replace
              activeStyle={{
                color: "white",
                backgroundColor: colors?.menuTempItem?.background,
                // border: "1px solid #313640",
              }}
            >
              {name}
            </MenuTempItem>
          </ButtonBase>
          <div></div>
        </MenuTempParent>
      ))}
    </MenuTempWrapper>
  );
};

const MenuTempParent = styled.div`
  border-radius: 5px;
  cursor: pointer;
  box-shadow: rgb(160 160 160) -1px 1px 6px -3px;
  white-space: nowrap;
  height: 40px;
  overflow: hidden;
`;
const MenuTempWrapper = styled(Scroll)`
  display: flex;
  flex-direction: row-reverse;
  overflow-x: auto;
  padding: 0px 15px;
  font-size: 14px;
  margin-top: -4px;
  padding-bottom: 15px;
  align-items: center;
  margin-bottom: 19px;
  direction: ltr;
  height: 70px !important;
  margin-top: ${({ MobileDevice }) => (MobileDevice ? "-15px" : "0px")};
  & .RippleNavStore {
    overflow: unset !important;
    padding: 7px 10px;
    height: 100%;
  }
`;
const MenuTempItem = styled(NavLink)`
  color: black;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  display: block;
  padding-top: 2px;
`;
export default MenuTemp;
