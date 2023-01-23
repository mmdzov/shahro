import { ButtonBase } from "@material-ui/core";
import useGetTheme from "hooks/useGetTheme";
import styled from "styled-components";
export const ModalBtn = ({
  children,
  mode,
  onClick = () => {},
  special = false,
  radius = "100px",
  delay = 2000,
  delayAfterClick = 300,
  ...props
}) => {
  const { colors } = useGetTheme();
  return (
    <ButtonBase
      style={{ borderRadius: radius, color: "#ccc" }}
      onClick={(e) => onClick(e)}
    >
      <ModalStyle
        hasSpecial={special}
        style={{
          backgroundColor:
            mode === "full" ? colors?.primary?.background : "white",
          color:
            mode === "full"
              ? colors?.primary?.color
              : colors?.primary?.background,
          border:
            mode === "full"
              ? "1px solid transparent"
              : `1px solid ${colors?.primary?.background}`,
          ...props,
        }}
        {...props}
      >
        {children}
      </ModalStyle>
    </ButtonBase>
  );
};
export const ModalWrapper = ({ children, ...props }) => {
  return <ModalBtnContainer {...props}>{children}</ModalBtnContainer>;
};

const ModalStyle = styled.div`
  border-radius: 23px;
  padding: 3px 0px;
  /* margin: ${({ hasSpecial }) => (hasSpecial ? "0" : "0 5px")}; */
  cursor: pointer;
  width: ${({ width }) => width ?? "80px"};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 27px;
`;
const ModalBtnContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  grid-gap: 5px;
  padding: 0 40px;
`;
