import PlusIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Ripples from "./Ripples";

const AddIcon = ({
  to,
  mode = "link",
  isDone = false,
  special = false,
  Icon = PlusIcon,
  onClick = () => {},
  ...props
}) => {
  const [delay] = useState(0);
  const [duration] = useState("1s");
  const handleClick = (e) => {
    let timeout;
    clearTimeout(timeout);
    if (!special) {
      // timeout = setTimeout(() => {
      onClick(e);
      // }, delay);
      return;
    }
    e.currentTarget.classList.add("touchedButton");
    timeout = setTimeout(() => {
    onClick(e);
    }, delay);
  };
  return (
    <>
      {mode === "link" ? (
        <AddLink to={to} {...props} className="floatingButton">
          <Ripples>{isDone ? <DoneIcon /> : <Icon />}</Ripples>
        </AddLink>
      ) : (
        <AddDivContainer className="">
          {!special ? (
            <Ripples
              className="addIconFixed"
              delay={300}
              delayAfterClick={300}
              onClick={handleClick}
            >
              <>
                <AddDiv
                  className="floatingButton"
                  {...props}
                  duration={duration}
                />
                {isDone ? <DoneIcon /> : <Icon />}
              </>
            </Ripples>
          ) : (
            <>
              <AddDiv
                className="floatingButton"
                {...props}
                duration={duration}
                onClick={handleClick}
              />
              {isDone ? <DoneIcon /> : <Icon />}
            </>
          )}
        </AddDivContainer>
      )}
    </>
  );
};

const AddLink = styled(Link)`
  position: fixed;
  bottom: 15px;
  left: 12px;
  color: white;
  border-radius: 100px;
  cursor: pointer;
  z-index: 1;
  & .ripple {
    padding: 10px;
  }
`;
const AddDiv = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 15px;
  left: 12px;
  padding: 10px;
  color: white;
  border-radius: 100px;
  width: 45px;
  height: 45px;
  cursor: pointer;
  &.touchedButton {
    transform: scale(100);
    transition: all ${({ duration }) => duration || "0.6s"} ease-in-out;
  }
`;
const AddDivContainer = styled.div`
  & svg {
    font-size: 1.5rem !important;
    position: fixed;
    left: 23px;
    bottom: 24px;
    z-index: 999999;
    color: white;
    pointer-events: none;
    cursor: pointer;
  }
  & .addIconFixed {
    position: fixed;
    width: 45px;
    height: 45px;
    bottom: 15px;
    z-index: 9;
    left: 12px;
  }
`;

export default AddIcon;
