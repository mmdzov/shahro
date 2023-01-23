import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import usePath from "hooks/usePath";

const BarLayout = ({
  title,
  children,
  hasMoreIcon = false,
  handleMore = () => {},
  mode = "",
}) => {
  const { goBack } = usePath();
  const handleBack = () => {
    switch (mode) {
      case "setting": {
        goBack();
        return;
      }
      case "editAccount": {
        goBack();
        return;
      }
      default:
        return goBack();
    }
  };
  return (
    <Container>
      <Header>
        <div style={{ color: "#bbb", cursor: "pointer" }} onClick={handleBack}>
          <CloseIcon style={{ fontSize: "2rem", marginLeft: "10px" }} />
        </div>
        <Title>{title}</Title>
        {hasMoreIcon ? (
          <div
            style={{ color: "#bbb", cursor: "pointer" }}
            onClick={handleMore}
          >
            <MoreVertOutlinedIcon
              style={{ fontSize: "2rem", marginLeft: "10px" }}
            />
          </div>
        ) : null}
      </Header>
      {children}
    </Container>
  );
};
const Title = styled.div`
  margin-top: 12px;
  font-size: 1.2rem;
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  height: 60px;
  align-items: center;
  padding: 0 10px;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 40px;
  margin-bottom: 15px;
`;
const Container = styled.div``;
export default BarLayout;
