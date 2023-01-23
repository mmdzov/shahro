import StoreSlideList from "./StoreSlideList";
import styled from "styled-components";
import SlideTemp from "../../components/SlideTemp/SlideTemp";

const StoreMain = ({ prods }) => {
  return (
    <StoreMainContainer>
      {prods?.map((item) => (
        <SlideTemp
          data={item.products}
          key={item.token}
          isExist={item.products.length > 0 ? true : false}
          isBorderTop={false}
          title={item.name}
          path={`/store/${item.token}`}
        >
          <StoreSlideList list={item.products} />
        </SlideTemp>
      ))}
    </StoreMainContainer>
  );
};
const StoreMainContainer = styled.div`
  margin-top: -30px;
`;
export default StoreMain;
