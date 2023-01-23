import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Alert = ({ children }) => {
  useEffect(() => {
    const alert = document.getElementById("alert");
    alert.style.zIndex = "999999999";
  }, []);
  return createPortal(
    <AlertContainer>
      <AlertMsg className="alertMsg">{children}</AlertMsg>
    </AlertContainer>,
    document.getElementById("alert")
  );
};
const AlertMsg = styled.div`
  width: 80%;
  color: white;
  height: inherit;
  padding: 10px 13px;
  font-size: 0.7rem;
  font-weight: 400;
  line-height: 20px;
`;
const AlertContainer = styled.div`
  z-index: 9999999;
  max-width: 300px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Alert;
