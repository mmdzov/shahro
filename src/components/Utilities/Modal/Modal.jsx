import Backdrop from "../Backdrop/Backdrop";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
const Modal = ({ children, w, h, blur = () => {}, padding, mw, ...props }) => {
  const r = useRef(null);
  useEffect(() => {
    r.current.focus();
  }, [r]);
  return createPortal(
    <Wrapper>
      <ModalWrapper style={{ ...props }}>
        <ModalContainer
          w={w}
          h={h}
          tabIndex="-1"
          padding={padding}
          ref={r}
          onBlur={blur}
          maxWidth={mw ? mw : 300 + "px"}
          {...props}
        >
          {/* <HiddenInput type="hidden" name="" tabIndex="1" ref={inp} autoFocus /> */}
          {children}
        </ModalContainer>
      </ModalWrapper>
      <Backdrop {...props} />
    </Wrapper>,
    document.getElementById("modal")
  );
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 99999999999;
  right: 0;
`;
const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContainer = styled.div`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  outline: none;
  z-index: 999999999;
  position: relative;
  background: white;
  border-radius: 6px;
  padding: ${({ padding }) => (padding ? padding : "15px 10px")};
  cursor: initial;
  max-width: ${({ maxWidth }) => maxWidth};
  overflow: hidden;
`;
export default Modal;
