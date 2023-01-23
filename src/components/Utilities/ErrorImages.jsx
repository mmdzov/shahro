import ImageIcon from "@material-ui/icons/Image";
import { memo, useState } from "react";
import styled from "styled-components";
import PersonIcon from "@material-ui/icons/Person";
import classes from "./Slider.module.css";

const ErrorImages = ({
  src,
  Img,
  width,
  height,
  sizeIcon,
  border,
  isRadius,
  user = false,
  isInitial = false,
  isError = null,
  cb = () => {},
  token = "",
  person = false,
  ...props
}) => {
  const [error, setError] = useState(false);
  const handleError = (e) => {
    e.preventDefault();
    setError(true);
    cb(token, true);
  };
  const handleLoad = (e) => {
    e.preventDefault();
    setError(false);
    cb(token, false);
  };
  if (isError === true && person)
    return (
      <Cotnainer
        isRadius={isRadius}
        style={{ ...props }}
        w={width}
        h={height}
        border={border}
      >
        <CustomImg
          isInitial={isInitial}
          src={src}
          alt=""
          // style={{ opacity: 0 }}
          {...props}
          onError={handleError}
          onLoad={handleLoad}
        />
        <ErrorIcon className="errorIcon">
          <PersonIconContainer className="personIconContainer">
            <PersonIcon style={{ fontSize: `${sizeIcon}` }} />
          </PersonIconContainer>
        </ErrorIcon>
      </Cotnainer>
    );
  if (person)
    return (
      <Cotnainer
        isRadius={isRadius}
        style={{ ...props }}
        w={width}
        h={height}
        border={border}
      >
        <CustomImg
          isInitial={isInitial}
          src={src}
          alt=""
          // style={{ opacity: 0 }}
          {...props}
          onError={handleError}
          onLoad={handleLoad}
          className={`${classes.BgError}`}
        />
        {error ? (
          <ErrorIcon className="errorIcon">
            <PersonIconContainer className="personIconContainer">
              <PersonIcon style={{ fontSize: `${sizeIcon}` }} />
            </PersonIconContainer>
          </ErrorIcon>
        ) : null}
      </Cotnainer>
    );
  if (user)
    return (
      <Cotnainer
        isRadius={isRadius}
        style={{ ...props }}
        w={width}
        h={height}
        border={border}
      >
        <CustomImg
          isInitial={isInitial}
          src={src}
          alt=""
          // style={{ opacity: 0 }}
          {...props}
          onError={handleError}
          onLoad={handleLoad}
          className={`${classes.BgError}`}
        />
        {error ? (
          <ErrorIcon className="errorIcon">
            <ImageIcon style={{ fontSize: `${sizeIcon}` }} />
          </ErrorIcon>
        ) : null}
      </Cotnainer>
    );
  return (
    <Cotnainer
      isRadius={isRadius}
      style={{ ...props }}
      w={width}
      h={height}
      border={border}
    >
      {Img ? (
        <Img
          src={src}
          alt=""
          style={{ width, height }}
          {...props}
          onError={handleError}
        />
      ) : (
        <CustomImg
          isInitial={isInitial}
          src={src}
          alt=""
          {...props}
          onError={handleError}
        />
      )}
      {error ? (
        <ErrorIcon className="errorIcon">
          {person ? (
            <PersonIconContainer className="personIconContainer">
              <PersonIcon style={{ fontSize: `${sizeIcon}` }} />
            </PersonIconContainer>
          ) : (
            <ImageIcon style={{ fontSize: `${sizeIcon}` }} />
          )}
        </ErrorIcon>
      ) : !src ? (
        <ErrorIcon className="errorIcon">
          {person ? (
            <PersonIconContainer className="personIconContainer">
              <PersonIcon style={{ fontSize: `${sizeIcon}` }} />
            </PersonIconContainer>
          ) : (
            <ImageIcon style={{ fontSize: `${sizeIcon}` }} />
          )}
        </ErrorIcon>
      ) : null}
    </Cotnainer>
  );
};

const PersonIconContainer = styled.div`
  width: 100%;
  height: 100%;
  color: #2b6cff;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  & > svg {
    font-size: 3.7rem;
    margin-bottom: -10px;
  }
`;

const CustomImg = styled.img`
  width: inherit;
  height: ${({ isInitial }) => (isInitial ? "initial" : "inherit")};
`;

const ErrorIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  color: #949494;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Cotnainer = styled.div`
  position: relative;
  border-radius: ${({ isRadius }) => (isRadius ? isRadius + "px" : "100px")};
  overflow: hidden;
  width: ${({ w }) => `${w}px`};
  height: ${({ h }) => `${h}px`};
  border: ${({ border }) => (border ? border : "0px !important")};
`;

export default memo(ErrorImages);
