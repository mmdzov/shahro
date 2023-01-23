import Delete from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DeleteIcon = ({
  to,
  mode = "div",
  isDone = false,
  Icon = Delete,
  ...props
}) => {
  return (
    <>
      {mode === "link" ? (
        <AddLink to={to} {...props} className="floatingButtonDelete">
          {isDone ? <Delete /> : <Icon />}
        </AddLink>
      ) : (
        <AddDiv className="floatingButtonDelete" {...props}>
          {isDone ? <Delete /> : <Icon />}
        </AddDiv>
      )}
    </>
  );
};

const AddLink = styled(Link)`
  position: fixed;
  bottom: 110px;
  left: 12px;
  padding: 10px;
  color: white;
  border-radius: 100px;
  cursor: pointer;
  z-index: 1;
`;
const AddDiv = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 110px;
  left: 12px;
  padding: 10px;
  color: white;
  border-radius: 100px;
  cursor: pointer;
`;

export default DeleteIcon;
