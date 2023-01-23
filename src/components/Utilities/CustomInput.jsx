import { Fragment } from "react";
import { Input, Label, Select, Textarea, Wrapper } from "./CustomInput.styled";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import "./CustomInput.css";
import ProductModal from "components/Store/ProductModal";
const CustomInput = ({
  label,
  mode,
  type = "input",
  className = "",
  children,
  defaultSelected = "انتخاب کنید",
  open = false,
  setOpen = () => {},
  ...props
}) => {
  const T =
    type === "tel" ? (
      <Input
        {...props}
        type="tel"
        className={`customInput inputFocused ${className}`}
        autoComplete="off"
      />
    ) : type === "input" ? (
      <Input
        {...props}
        className={`customInput inputFocused ${className}`}
        autoComplete="off"
      />
    ) : type === "textarea" ? (
      <Textarea
        {...props}
        className={`customInputLabel inputFocused ${className}`}
        autoComplete="off"
      />
    ) : type === "select" ? (
      <>
        <Select
          {...props}
          className={`customInputLabel selectFocused ${className}`}
          onClick={() => setOpen(true)}
        >
          <div style={{ width: 27, textAlign: "center" }}>
            <ExpandMoreIcon style={{ fontSize: "1.4rem" }} />
          </div>
          <div style={{ fontSize: ".9rem", fontWeight: 600, color: "#646464" }}>
            {defaultSelected}
          </div>
        </Select>
        {open ? (
          <ProductModal blur={() => setOpen(false)}>{children}</ProductModal>
        ) : null}
      </>
    ) : null;
  return (
    <Fragment>
      {mode === "group" ? (
        <Wrapper>
          <Label style={{ ...props }}>
            {label.includes("اجباری") ? label.replace("اجباری", "") : label}
            {label.includes("اجباری") ? (
              <div
                className=""
                style={{
                  color: label.includes("اجباری") ? "red" : "black",
                  marginRight: 7,
                }}
              >
                *
              </div>
            ) : null}
          </Label>
          {T}
        </Wrapper>
      ) : mode === "single" ? (
        T
      ) : null}
    </Fragment>
  );
};

export default CustomInput;
