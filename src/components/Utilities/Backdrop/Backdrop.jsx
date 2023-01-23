import useGetTheme from "hooks/useGetTheme";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Backdrop = ({ children, ...props }) => {
  const [dspl, setDspl] = useState("none");
  const Sto = (num, cb, inp = "none") => {
    return setTimeout(() => cb(inp), num);
  };
  const { colors } = useGetTheme();
  useEffect(() => {
    let st;
    if (props.opacity === "0") st = Sto(500, setDspl);
    else setDspl("block");
    return () => clearTimeout(st);
  }, [props]);
  return (
    <BkDrp {...props} bg={colors?.backdrop?.background} display={dspl}>
      {children}
    </BkDrp>
  );
};

export default Backdrop;

const BkDrp = styled.div`
  transition: all 0.4s ease-in-out;
  position: fixed;
  height: 100vh;
  width: 100%;
  background: ${({ bg }) => bg};
  top: 0;
  left: 0;
  cursor: pointer;
  opacity: ${(props) => props.opacity || "0"};
  display: ${(props) => props.display || "none"};
  z-index: ${(props) => props.zIndex || "999999"};
`;
