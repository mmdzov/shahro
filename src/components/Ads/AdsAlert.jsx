import styled from "styled-components";
import ErrorIcon from "@material-ui/icons/Error";

const AdsAlert = () => {
  return (
    <AlertCotainer>
      <AlertIcon>
        <ErrorIcon />
      </AlertIcon>
      <AlertText>
        لطفا خرید خود را فقط به صورت حضوری انجام دهید و پیش از آن هیچ مبلغی را
        واریز نکنید
      </AlertText>
    </AlertCotainer>
  );
};

const AlertText = styled.div`
  color: #565656;
`;
const AlertIcon = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;
const AlertCotainer = styled.div`
  color: #ccc;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 10px 0px;
  display: flex;
  margin-top: 15px;
  border-top: 1px solid #ded5c2;
`;
export default AdsAlert;
