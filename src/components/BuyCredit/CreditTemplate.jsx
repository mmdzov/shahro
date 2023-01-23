import styled from "styled-components";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import toPersian from "utilities/ToPersian";

const CreditTemplate = ({ list, state, title = "نوع سیم کارت" }) => {
  const handleSelect = (id) => {
    const s = [...list];
    const result = s.map((item) => {
      return { ...item, checked: false };
    });
    const index = s.findIndex((item) => item.id === id);
    result[index].checked = true;
    state(result);
  };
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      {list.map((item) => (
        <Item key={item.id} onClick={() => handleSelect(item.id)}>
          <Radio checked={item.checked}>
            {item.checked ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </Radio>
          <div>
            <ItemName>{toPersian(item.name)}</ItemName>
            <ItemLabel>{item.label}</ItemLabel>
          </div>
        </Item>
      ))}
    </ListContainer>
  );
};
const ItemName = styled.div`
  font-weight: bold;
`;
const ItemLabel = styled.div`
  color: #737373;
  font-size: 0.9rem;
`;
const Radio = styled.div`
  margin-left: 15px;
  color: ${({ checked }) => (checked ? "#0089ff" : "#ccc")};
  & > svg {
    font-size: 1.8rem;
  }
`;
const Item = styled.div`
  display: flex;
  padding: 0 10px;
  margin-bottom: 25px;
  cursor: pointer;
`;
const ListTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #6f7071;
`;
const ListContainer = styled.div`
  padding: 0 15px;
`;
export default CreditTemplate;
