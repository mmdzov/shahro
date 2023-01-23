import { ButtonBase } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";
import toPersian from "utilities/ToPersian";

const PlusBtn = ({ gradient, fillDay = 0, ...props }) => {
  return (
    <ButtonBase style={{ borderRadius: "10px" }}>
      <Btn
        fillDay={fillDay}
        className={`rounded-md bg-gradient-to-r ${gradient} text-white focus:outline-none p-2`}
        {...props}
      >
        {fillDay !== 0 ? (
          <div className="">{toPersian(fillDay)}</div>
        ) : (
          <AddIcon />
        )}
      </Btn>
    </ButtonBase>
  );
};

const Btn = styled.button`
  ${({ fillDay }) =>
    fillDay > 0
      ? `  width: 40px;
  font-weight: bold;
  font-size: 1.2rem;
  height: 40px;`
      : ``}
`;

export default PlusBtn;
