import { Container, Item } from "./SelectList.styled";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const SelectList = ({ check, children, onCheck }) => {
  return (
    <Container>
      <Item onClick={onCheck}>
        {check === 1 ? (
          <div>
            <RadioButtonCheckedIcon style={{ color: "#008eff" }} />
          </div>
        ) : check === 0 ? (
          <div style={{ color: "rgb(128 128 128)" }}>
            <RadioButtonUncheckedIcon />
          </div>
        ) : null}
        <div style={{ marginRight: 7 }}>{children}</div>
      </Item>
    </Container>
  );
};

export default SelectList;
