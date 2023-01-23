import {
  EmptyBasketContainer,
  EmptyBasketDescription,
  EmptyBasketIcon,
  EmptyBasketTitle,
} from "./Basket.styled";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ErrorIcon from "@material-ui/icons/Error";
import { ButtonBase } from "@material-ui/core";
const EmptyBasket = ({
  title,
  msg,
  button = false,
  click = () => {},
  Icon = RemoveShoppingCartIcon,
  ...props
}) => {
  return (
    <EmptyBasketContainer
      style={{ borderTop: title ? "0px" : "1px solid #ccc" }}
      {...props}
    >
      <EmptyBasketIcon>
        {Icon === "Error" ? (
          <ErrorIcon style={{ fontSize: "3.5rem" }} />
        ) : (
          <Icon />
        )}
      </EmptyBasketIcon>
      <EmptyBasketTitle>{title || "سبد خالی"}</EmptyBasketTitle>
      <EmptyBasketDescription>
        {button ? (
          <ButtonBase onClick={click} style={{ ...props }}>
            {msg}
          </ButtonBase>
        ) : (
          msg || "درحال حاظر سبدتان خالی می باشد!"
        )}
      </EmptyBasketDescription>
    </EmptyBasketContainer>
  );
};

export default EmptyBasket;
