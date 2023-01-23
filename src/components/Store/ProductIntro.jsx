import { useDispatch, useSelector } from "react-redux";
import {
  ProdColorItem,
  ProdPadding,
  ProdParent,
  ProdTopTitle,
  TwoDot,
} from "./Product.styled";
import ProductColor from "./ProductColor";
import ProductPrice from "./ProductPrice";
import ProductSlider from "./ProductSlider";
import ProductSubSlider from "./ProductSubSlider";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useForceUpdate from "hooks/useForceUpdate";
import { setProductLike } from "store/actions/productAction";
import { useLocation } from "react-router";
import ErrorImages from "components/Utilities/ErrorImages";
import { useHistory } from "react-router-dom";
import useLoading from "hooks/useLoading";
import AvatarProductLoading from "components/Utilities/AvatarProfuctLoading";
import ImageIcon from "@material-ui/icons/Image";

const ProductIntro = ({
  colorName,
  setColorName,
  like,
  setLike,
  size,
  setSize,
  modal,
}) => {
  const { pathname } = useLocation();
  const forceUpdate = useForceUpdate();
  const [toggle, setToggle] = useState(false);
  const {
    single: { product: prod },
    single,
  } = useSelector(({ product }) => product);
  const dispatch = useDispatch();
  const handleLike = async () => {
    await setLike(prod?.likeMe === 1 ? 0 : 1);
    await dispatch(setProductLike(pathname.split("/")[3]));
  };
  const handleSetColor = (color) => {
    setColorName(color);
  };
  useEffect(() => {
    forceUpdate();
    setSize(prod?.sizes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prod]);
  const history = useHistory();
  const textRef = useRef(null);
  const [visibleToggleBtn, setVisibleToggleBtn] = useState(false);
  useEffect(() => {
    if (textRef && textRef.current) {
      const height = textRef.current.getBoundingClientRect().height;
      if (height > 50) {
        setVisibleToggleBtn(true);
      }
    }
  }, [textRef, prod?.text]);
  const { loading: l } = useLoading(prod);
  return (
    <ProdParent>
      {!l ? (
        single?.account ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => history.push(`/profile/${single.account.token}`)}
          >
            <ErrorImages
              person
              width={38}
              height={38}
              sizeIcon="2.8rem"
              src={single?.account?.image}
            />
            <div className="" style={{ marginRight: 7, fontSize: ".9rem" }}>
              {single?.account?.name}
            </div>
          </div>
        ) : null
      ) : (
        <AvatarProductLoading />
      )}
      {prod?.images?.length === 0 ? (
        <EmptyImage>
          <ImageIcon style={{ fontSize: `2.7rem` }} />
        </EmptyImage>
      ) : prod?.images?.length === 1 ? (
        <div style={{ position: "relative", maxHeight: 186 }}>
          <img
            src={prod.images[0]}
            alt=""
            style={{
              width: "inherit",
              margin: "0 auto",
              maxHeight: "inherit",
            }}
          />
          <div
            className=""
            style={{
              width: "100%",
              maxHeight: "100%",
              position: "absolute",
              left: "0px",
              top: "0px",
              display: "flex",
              height: "100%",
            }}
          />
        </div>
      ) : (
        <FlexibleProdSlider prod={prod} />
      )}
      <ProdPadding style={{ paddingBottom: "10px" }}>
        <ProductSubSlider like={like} prod={prod} onLike={handleLike} />
        <ProductPrice prod={prod} />
        {prod?.sizes.length > 0 ? (
          <SizeContainer>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SizeTitle>
                سایز<TwoDot>:</TwoDot>
              </SizeTitle>
              <SizeNameTitle>{size?.name}</SizeNameTitle>
            </div>
            <SizeList>
              {prod?.sizes?.map((item) => (
                <ProdColorItem
                  key={item.token}
                  style={{
                    padding: "8px 10px",
                    direction: "ltr",
                    backgroundColor:
                      size?.token === item.token ? "rgb(241 241 241)" : "white",
                  }}
                  onClick={() => setSize(item)}
                >
                  <span style={{ paddingLeft: "5px" }}> سایز</span>
                  <span>{item.name}</span>
                </ProdColorItem>
              ))}
            </SizeList>
          </SizeContainer>
        ) : null}
        <ProductColor
          onColor={handleSetColor}
          color={colorName}
          setColor={setColorName}
        />
        {prod?.text ? (
          <TextContainer>
            <TextContent
              className={`visibleText ${!toggle ? "active" : ""}`}
              ref={textRef}
            >
              {prod.text}
            </TextContent>
            {visibleToggleBtn ? (
              <ToggleBtn onClick={() => setToggle((prev) => !prev)}>
                {toggle ? "بستن" : "بیشتر"}
              </ToggleBtn>
            ) : null}
          </TextContainer>
        ) : null}
      </ProdPadding>
    </ProdParent>
  );
};

const EmptyImage = styled.div`
  width: 100%;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    font-size: 5.7rem !important;
    color: #cccccc;
  }
`;

const FlexibleProdSlider = styled(ProductSlider)`
  height: 186px !important;
  @media (min-width: 480px) {
    height: 300px !important;
  }
`;
const ToggleBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  border-top: 1px solid #ccc;
  margin-top: 5px;
  font-weight: bold;
  cursor: pointer;
  height: 40px;
  padding-top: 18px;
`;
const TextContent = styled.div`
  font-size: 13px;
  overflow: hidden;
  font-weight: 600;
  line-height: 23px;
  transition: all 0.4s ease-in-out;
  max-height: 7000px;
  height: auto;
`;

const TextContainer = styled.div`
  margin-top: 25px;
  width: 105%;
  margin-right: -10px;
`;
const SizeList = styled.div`
  display: flex;
  flex-direction: row-reverse;
  overflow-x: auto;
  padding-bottom: 8px;
`;
const SizeNameTitle = styled.div`
  margin-right: 10px;
  font-size: 16px;
  margin-top: 4px;
`;
const SizeTitle = styled(ProdTopTitle)`
  display: flex;
  margin-top: 15px;
  font-size: 18px;
  align-items: center;
  margin-bottom: 10px;
`;
const SizeContainer = styled.div``;

export default ProductIntro;
