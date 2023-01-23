// import styled from "styled-components";
import LineEllipsis from "components/Utilities/LineEllipsis";
import { memo } from "react";
import toToman from "utilities/toToman";
import { ListContent, Price, Title } from "./SlideTemp.styled";

const SlideTempListContent = ({
  name,
  price,
  sub,
  pos,
  mode,
  isAds = false,
}) => {
  return (
    <ListContent style={{ marginTop: isAds ? "0px" : "10px" }}>
      <Title
        className="ListTitle"
        style={{
          marginTop: "4px",
          width: "100%",
          textAlign: pos || "right",
          padding: "0 5px",
        }}
      >
        <LineEllipsis text={name} maxLine="1" ellipsis="..." />
      </Title>

      <Price style={{ textAlign: pos || "center", fontSize: 12 }}>
        {mode === "ads" ? price : toToman(price)}
      </Price>

      {sub ? (
        <Price
          style={{ textAlign: pos || "center", fontSize: 12 }}
          color={mode !== "ads" ? "red" : ""}
          decor={mode !== "ads" ? "line-through" : ""}
        >
          {mode === "ads" ? sub : toToman(sub)}
        </Price>
      ) : (
        <span></span>
      )}

      {/*
      {mode === "ads" ? (
                            sub ? (
                              <AdsPrice
                                style={{
                                  marginTop: "4px",
                                  fontSize: "12px",
                                  width: "100%",
                                  textAlign: pos || "right",
                                }}
                              >
                                {toToman(sub)}
                              </AdsPrice>
                            ) : (
                              <span></span>
                            )
      )
      : +sub ? 
        (
          <Price color="red" decor="line-through">
            {toToman(sub)}
          </Price>
        ) : (
        <Title
          style={{
            marginTop: "4px",
            fontSize: "12px",
            width: "100%",
            textAlign: pos || "right",
          }}
        >
          {sub}
        </Title>
      )}

      */}
    </ListContent>
  );
};

// const AdsPrice = styled.div`
//   font-weight: 500;
//   font-size: 0.8rem;
//   margin-top: 5px;
//   color: black;
// `;

export default memo(SlideTempListContent);
