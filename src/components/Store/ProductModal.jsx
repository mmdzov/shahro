import Modal from "components/Utilities/Modal/Modal";
import { useEffect, useState } from "react";

const ProductModal = ({ w, h, children, mw, ...props }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    ) {
      setIsMobile(true);
    } else setIsMobile(false);
  }, []);
  return (
    <Modal
      opacity="1"
      w={w ? w : "87%"}
      h={h ? h : "auto"} // 400px
      marginTop={isMobile ? "0" : "0"} // isMobile ? "-50px" : "0"
      // style={{ background: "#00000082" }}
      mw={mw ? mw : 300 + "px"}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default ProductModal;
