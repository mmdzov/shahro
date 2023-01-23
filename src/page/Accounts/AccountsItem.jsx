import styled from "styled-components";
import ErrorImages from "components/Utilities/ErrorImages";
import { Link } from "react-router-dom";
import { memo, useState } from "react";
import { ListItemContainer } from "components/SlideTemp/SlideTemp.styled";

const AccountsItem = ({ item, callback }) => {
  const [isError, setError] = useState(item?.error);
  const handleError = (token, error) => {
    setError(error);
  };
  return (
    <ItemContainer>
      <Item to={`/profile/${item?.token}`} key={item?.token}>
        <ErrorImages
          person
          isError={isError}
          cb={() => handleError()}
          token={item?.token}
          src={item?.image}
          width={50}
          height={50}
          sizeIcon="3.4rem"
        />
      </Item>
    </ItemContainer>
  );
};
export const Item = styled(Link)``;
const ItemContainer = styled(ListItemContainer)`
  margin-top: 6px;
  margin-left: 6px;
  cursor: pointer;
  @media (min-width: 768px) {
    margin-left: 27px;
  }
`;
export default memo(AccountsItem);
