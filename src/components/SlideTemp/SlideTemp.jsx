/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styled from "styled-components";
import SlideContentLoader from "./SlideContentLoader";
import useLoading from "hooks/useLoading";
import { memo } from "react";

const SlideTemp = ({
  render: Component,
  path = "",
  title,
  moreTitle = "مشاهده بیشتر",
  loading,
  isBorderTop = true,
  isMain = false,
  isExist = true,
  hasTitle = true,
  hasMoreTitle = true,
  data,
  hasFares = false,
  isMarginTop = false,
  paddingTop = "10px",
  marginBottom = 25,
  children,
  ...props
}) => {
  return (
    <SlideTempWrapper
      paddingTop={isMain ? "10px" : "0px"}
      marginBottom={!isExist && "0px"}
      marginTop={"35px"}
      style={{
        marginBottom,
        paddingTop: paddingTop,
        // borderTop: isBorderTop ? "1px solid #eee" : "unset",
        marginTop: "0px",
        marginRight: loading ? "-5px" : "0px",
        ...props,
      }}
      {...props}
    >
      {hasTitle ? (
        <Link
          to={path}
          className={`font-bold text-sm cursor-pointer`}
          style={{ fontSize: 11, whiteSpace: "nowrap" }}
        >
          <div
            className={`flex justify-between items-center h-12 p-4 `}
            style={{ height: "2.9rem" }}
            {...props}
          >
            <h2 className={`font-bold text-base`} style={{ fontSize: ".8rem" }}>
              {title}
            </h2>

            {hasMoreTitle ? (
              <div className="" style={{ cursor: "pointer" }}>
                {moreTitle}
                <ArrowBackIosIcon style={{ fontSize: 16, color: "gray" }} />
              </div>
            ) : null}
          </div>
        </Link>
      ) : null}

      {loading ? (
        <SlideContentLoader hasFares={hasFares} />
      ) : children ? (
        children
      ) : (
        <Component />
      )}
    </SlideTempWrapper>
  );
};

// padding-top: ${({ paddingTop }) => paddingTop};
const SlideTempWrapper = styled.div`
  margin-top: ${({ marginTop }) => marginTop | "15px"};
  border-top: 1px solid #f3e4d1; /*#eee*/
  overflow: hidden !important;
  &:not(:last-of-type) {
    margin-bottom: ${({ marginBottom }) => marginBottom | "15px"};
  }
`;
export default memo(SlideTemp);
