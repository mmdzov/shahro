import ErrorImages from "components/Utilities/ErrorImages";
import AddPostContext from "context/AddPostContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { AddPostHeader as Container } from "./AddPost.styled";

const AddPostHeader = () => {
  const { submit, cancel } = useContext(AddPostContext);
  const { account } = useSelector(({ account }) => account);
  const { guestName } = useSelector(({ _MainReducer }) => _MainReducer);
  return (
    <Container>
      <div>
        <button type="submit" onClick={submit}>
          ارسال
        </button>
        <div>مطلب جدید</div>
        <button onClick={cancel}>انصراف</button>
      </div>
      <div>
        <ErrorImages src={account?.image} width={50} height={50} />
        <div style={{ marginRight: 15 }}>{account?.name ?? guestName}</div>
      </div>
    </Container>
  );
};

export default AddPostHeader;
