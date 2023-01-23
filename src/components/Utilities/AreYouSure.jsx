import { ModalHeader, ModalQuestion } from "components/Settings/Setting.styled";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ModalWrapper } from "components/Utilities/ModalButton/ModalButton";
import ProductModal from "components/Store/ProductModal";
import { ModalBtn } from "components/Utilities/ModalButton/ModalButton";
import { ButtonBase } from "@material-ui/core";
const AreYouSure = ({
  Icon = ExitToAppIcon,
  open,
  setOpen = () => {},
  click = () => {},
  mode = "logout",
}) => {
  return (
    <ProductModal>
      <ModalHeader
        style={{ background: mode === "delete" ? "#dc2626" : "#008eff" }}
      >
        <div style={{ marginBottom: 5 }}>
          <Icon style={{ fontSize: "5rem" }} />
        </div>
        <div style={{ fontWeight: 600, fontSize: "1.2rem" }}>
          {mode === "logout" ? "خروج" : "حذف"}
        </div>
      </ModalHeader>
      <ModalQuestion>
        {mode === "logout"
          ? "میخواهید از حساب کاربری خود خارج شوید؟"
          : "مطمئنید؟"}
      </ModalQuestion>
      <ModalWrapper>
        <div className="" style={{ overflow: "hidden", borderRadius: "100px" }}>
          <ButtonBase>
            <ModalBtn
              mode="full"
              onClick={click}
              style={{
                background: mode === "delete" ? "#dc2626" : "#008eff",
                color: "white",
              }}
            >
              بله
            </ModalBtn>
          </ButtonBase>
        </div>
        <div className="" style={{ overflow: "hidden", borderRadius: "100px" }}>
          <ButtonBase>
            <ModalBtn
              onClick={() => setOpen(false)}
              style={{
                border:
                  mode === "delete" ? "1px solid #dc2626" : "1px solid #008eff",
              }}
            >
              خیر
            </ModalBtn>
          </ButtonBase>
        </div>
      </ModalWrapper>
    </ProductModal>
  );
};

export default AreYouSure;
