import styled from "styled-components";

const BarTempBtn = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

const Button = styled.button`
  width: 100%;
  max-width: 376px;
  padding: 15px 0px;
  border: 1px solid #0089ff;
  border-radius: 170px;
  color: #0089ff;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 12px;
`;
export default BarTempBtn;
