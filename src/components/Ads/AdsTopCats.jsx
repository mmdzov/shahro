import FilterListIcon from "@material-ui/icons/FilterList";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdsTopCats = () => {
  const [catList] = useState([
    {
      id: 1,
      catname: "همه گروه ها",
      Icon: FilterListIcon,
      url: `/ads/category`,
    },
  ]);
  return (
    <AdsTopCatsContainer className="toolbarBackground">
      {catList.map(({ catname, Icon, id, url }) => (
        <AdsCatItem to={url} key={id}>
          <CatName>{catname}</CatName>
          <CatIcon>
            <Icon />
          </CatIcon>
        </AdsCatItem>
      ))}
    </AdsTopCatsContainer>
  );
};

const CatName = styled.div`
  width: inherit;
  margin-top: 5px;
  font-size: 0.8rem;
  font-weight: 600;
`;
const CatIcon = styled.div`
  & > svg {
    font-size: 1.5rem;
  }
`;
const AdsCatItem = styled(Link)`
  width: max-content;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 15px;
`;
const AdsTopCatsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: auto;
  overflow-x: auto;
  padding: 10px 5px;
  padding-left: 15px;
  border-bottom: 1px solid #ccc;
  background: #ffffff;
`;

export default AdsTopCats;
