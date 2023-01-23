/* eslint-disable no-unused-vars */
import Modal from "./Modal";
import styled from "styled-components";
import "./modal.css";
const ModalConnection = () => {
  return (
    <Modal
      opacity="1"
      w="76%"
      // style={{ zIndex: 99999999 }}
      paddingLeft="0"
      paddingRight="0"
    >
      <div>
        <Title>
          <div className="svg-loader">
            <svg
              className="svg-container"
              height="70"
              width="70"
              viewBox="0 0 100 100"
            >
              <circle className="loader-svg bg" cx="50" cy="50" r="45"></circle>
              <circle
                className="loader-svg animate"
                cx="50"
                cy="50"
                r="45"
              ></circle>
            </svg>
          </div>
        </Title>
        <Content>لطفا صبور باشید...</Content>
      </div>
    </Modal>
  );
};

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 8px;
  text-align: center;
`;
const Content = styled.div`
  font-size: 0.8rem;
  /* margin-bottom: 15px; */
  font-weight: 600;
  /* padding: 0 10px; */
  text-align: center;
  /* padding-top: 10px; */
`;
export default ModalConnection;
