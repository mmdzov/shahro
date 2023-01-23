import { useState } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LineEllipsis from "../LineEllipsis";

const Select = ({ name, onClick, change, index }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ name: "انتخاب کنید", value: 0 });
  const [list] = useState([
    { name: "خیلی بد", value: 1 },
    { name: "بد", value: 2 },
    { name: "متوسط", value: 3 },
    { name: "خوب", value: 4 },
    { name: "خیلی خوب", value: 5 },
  ]);
  const handleClick = (item) => {
    setSelected(item);
    setOpen(false);
    change([item.value, index]);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <SelectContainer>
      <SelectRow>
        <SelectName>
          <LineEllipsis text={name} />
        </SelectName>
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setOpen(true)}
        >
          <span>
            <ArrowDropDownIcon />
          </span>
          <Pick>{selected.name}</Pick>
        </div>
      </SelectRow>
      {open ? (
        <Modal opacity="1" w="86%" onClick={handleClose} padding="0">
          <PickItem>انتخاب کنید:</PickItem>
          <ItemStyle>
            {list.map((item) => (
              <SelectItem
                key={item.value}
                className="selectItem"
                onClick={() => handleClick(item)}
              >
                {item.name}
              </SelectItem>
            ))}
          </ItemStyle>
        </Modal>
      ) : null}
    </SelectContainer>
  );
};
const ItemStyle = styled.div`
  box-sizing: border-box;
  color: #5f5f5f;
  margin-bottom: 10px;
`;
const Pick = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #7d7d7d;
  cursor: pointer;
`;
const PickItem = styled.div`
  font-weight: bold;
  padding: 15px 10px;
`;
const SelectItem = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0 15px;
  height: 40px;
  cursor: pointer;
  line-height: 40px;
  &:hover {
    background-color: #eee;
  }
`;
const SelectName = styled.div`
  color: black;
  height: 20px;
  overflow: hidden;
  width: 100%;
`;
const SelectRow = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  font-size: 0.8rem;
  font-weight: 600;
`;
const SelectContainer = styled.div`
  margin-top: 12px;
  padding-right: 5px;
  box-sizing: border-box;
  color: #565656;
`;
export default Select;
