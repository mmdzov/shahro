import ProductImg from "components/SlideTemp/productImg";
import useLoading from "hooks/useLoading";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { ProdSlider } from "./Product.styled";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import styled from "styled-components";

const ProductSlider = ({ prod, ...props }) => {
  const { loading } = useLoading(prod);
  const carousel = useRef(null);
  const { hasTouchScreen } = useSelector(({ _MainReducer }) => _MainReducer);

  if (loading) return <ProductImg />;
  return (
    <ProdSlider
      ref={carousel}
      {...props}
      renderCenterLeftControls={
        !hasTouchScreen
          ? ({ previousSlide }) => (
              <Button onClick={previousSlide}>
                <ChevronLeftIcon />
              </Button>
            )
          : () => {}
      }
      renderCenterRightControls={
        !hasTouchScreen
          ? ({ nextSlide }) => (
              <Button onClick={nextSlide}>
                <ChevronRightIcon />
              </Button>
            )
          : () => {}
      }
    >
      {prod?.images?.map((item) => (
        <img
          src={item}
          alt=""
          style={{ height: "inherit", width: "auto", margin: "0 auto" }}
          key={item}
        />
      ))}
    </ProdSlider>
  );
};
const Button = styled.button`
  background: #0000004d;
  color: #bdbdbd;
  & > svg {
    font-size: 2.6rem;
  }
`;
export default ProductSlider;
