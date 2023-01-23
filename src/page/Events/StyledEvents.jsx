const { default: styled } = require("styled-components");

//item appbar
export const ItemAppBar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

export const PlusItemAppBar = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

//popup menu
export const BtmMenu = styled.div`
  /* width: 100%; */
  /* height: 0px; */
  /* background-color: #ffffff; */
  /* position: fixed; */
  /* bottom: 0; */
  /* z-index: 99999; */
  /* border-radius: 30px 30px 0 0; */
  /* box-shadow: 0 0 19px -11px black; */
  /* overflow: hidden; */
  /* transition: all 0.2s ease-out; */
`;
export const BtmMenuHeader = styled.div`
  height: 50px;
  font-weight: 600;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
`;
export const BtmMenuHeaderTitle = styled.div`
  font-size: 1rem;
  font-family: ${(props) => props.fontFamily || "tahoma"};
`;
export const BtmMenuClose = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #565656;
  cursor: pointer;
`;
export const BtmMenuLine = styled.div`
  display: block;
  background: #d0d0d0;
  width: 60px;
  height: 6px;
  border-radius: 25px;
  margin: 0 auto;
  margin-top: 15px;
`;

//popup form
export const PpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 15px;
  margin-top: 10px;
`;
export const OpenPicker = styled.div`
  border: 1px solid #0095ff;
  border-radius: 5px;
  padding: 5px 10px;
  width: 150px;
  display: flex;
  align-items: center;
`;

//messages

export const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const MessageContainer = styled.div`
  padding: 0 23px;
  font-weight: bold;
  color: #4e4e4e;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0px;
  &.specialMessageBox {
    position: fixed;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
`;
export const MessageItem = styled.div``;

export const MsgItemCustom = styled.div`
  padding: 2px;
  border-radius: 100%;
  background: gray;
  color: white;
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
//buttons
export const SubBtmWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const SubmitButton = styled.button`
  margin-top: 20px;
  width: 50px !important;
  height: 50px;
  border-radius: 8px;
  color: white;
  background: rgb(71, 150, 225);
  background: -moz-linear-gradient(
    273deg,
    rgba(71, 150, 225, 1) 31%,
    rgba(10, 102, 189, 1) 79%
  );
  background: -webkit-linear-gradient(
    273deg,
    rgba(71, 150, 225, 1) 31%,
    rgba(10, 102, 189, 1) 79%
  );
  background: linear-gradient(
    273deg,
    rgba(71, 150, 225, 1) 31%,
    rgba(10, 102, 189, 1) 79%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#4796e1",endColorstr="#0a66bd",GradientType=1);
`;

export const HiddenClick = styled.div`
  width: 100%;
  height: 50px;
  background-color: red;
  position: absolute;
  top: 0;
  z-index: 100;
  left: -10px;
  cursor: pointer;
`;

export const TimePickerWrapper = styled.div`
  position: relative;
  width: 100%;
  right: -7px;
`;
