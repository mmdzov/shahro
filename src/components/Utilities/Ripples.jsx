import { useEffect, useState } from "react";
import "./Ripples.css";
const Ripples = ({
  className,
  children,
  onClick = () => {},
  radius = "100px",
  delay = 2000,
  delayAfterClick = 300,
  color,
  ...props
}) => {
  const [state, setState] = useState({
    spanStyles: {},
    count: 0,
  });
  const initializeState = () => {
    return {
      spanStyles: {},
      count: 0,
    };
  };
  useEffect(() => {
    initializeState();
  }, []);
  const showRipple = (e) => {
    const rippleContainer = e.currentTarget;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = e.pageX - pos.x - size / 2;
    const y = e.pageY - pos.y - size / 2;
    const spanStyles = {
      top: y + "px",
      left: x + "px",
      height: size + "px",
      width: size + "px",
    };
    const count = state.count + 1;
    setState({
      spanStyles: { ...state.spanStyles, [count]: spanStyles },
      count: count,
    });
  };

  const renderRippleSpan = () => {
    const { spanStyles = {} } = state;
    const spanArray = Object.keys(spanStyles);
    if (spanArray && spanArray.length > 0) {
      return spanArray.map((key, index) => {
        return (
          <div
            key={"spanCount_" + index}
            className="touchedItem"
            style={{
              background: color === "gray" ? "gray" : "white",
              ...spanStyles[key],
            }}
          ></div>
        );
      });
    } else {
      return null;
    }
  };
  const cleanUp = () => {
    const initialState = initializeState();
    setState({ ...initialState });
  };

  const callCleanUp = (cleanup, delay) => {
    let bounce;
    return function () {
      clearTimeout(bounce);
      bounce = setTimeout(() => {
        cleanup();
      }, delay);
    };
  };
  const timeout = (callback = () => {}) => {
    let t;
    clearTimeout(t);
    t = setTimeout(() => {
      callback();
    }, delayAfterClick);
  };
  return (
    <div
      className={`ripple ${className}`}
      {...props}
      onClick={(e) => timeout(() => onClick(e))}
    >
      {children}
      <div
        className="rippleContainer"
        style={{
          borderRadius: radius,
          cursor: "pointer",
          overflow: "hidden",
          zIndex: "2147483646",
        }}
        onMouseDown={showRipple}
        onMouseUp={callCleanUp(cleanUp, delay)}
      >
        {renderRippleSpan()}
      </div>
    </div>
  );
};

export default Ripples;
