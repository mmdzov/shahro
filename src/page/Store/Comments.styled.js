import styled from "styled-components";

export const AddComment = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  display: flex;
  flex-direction: row-reverse;
  padding: 9px 12px;
  border-radius: 1000px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  align-items: center;
  width: 100px;
  justify-content: space-between;
  cursor: pointer;
  background: -moz-linear-gradient(
    22deg,
    rgba(71, 150, 225, 1) 17%,
    rgba(10, 62, 189, 1) 78%
  );
  background: -webkit-linear-gradient(
    22deg,
    rgba(71, 150, 225, 1) 17%,
    rgba(10, 62, 189, 1) 78%
  );
  background: linear-gradient(
    22deg,
    rgba(71, 150, 225, 1) 17%,
    rgba(10, 62, 189, 1) 78%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#4796e1",endColorstr="#0a3ebd",GradientType=1);
  & > svg {
    font-size: 20px;
  }
`;
export const CommentTitle = styled.span`
  font-size: 1rem;
  min-height: 22px;
  font-weight: 600;
  min-height: 21px;
  width: 100px;
  display: block;
`;
export const CommentRate = styled.div`
  padding: 2px 9px;
  background: ${({ bg }) => bg};
  color: white;
  border-radius: 9px;
  font-size: 14px;
`;
export const CmBtnReport = styled.div`
  cursor: pointer;
  margin-right: 10px;
  & > svg {
    font-size: 18px;
    color: gray;
  }
`;
export const CmBtnLike = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 22px;
  min-width: 50px;
  & > div {
    color: gray;
    cursor: pointer;

    & > svg {
      font-size: 17px;
    }
  }
  & > span {
    font-size: 0.8rem;
    margin-top: 7px;
    color: gray;
    margin-left: 2px;
  }
`;
export const CmBtns = styled.div`
  display: flex;
  padding: 5px 10px;
  align-items: center;
  justify-content: flex-end;
`;
export const CmText = styled.div`
  //   min-height: 60px;
  padding: 5px 10px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 5px;
`;

export const CmContent = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 13px;
  padding: 0 5px;
  margin-bottom: 7px;
  /* & > img {
    width: 35px;
    border-radius: 100px;
    margin-left: 5px;
    height: 35px;
  } */
  & > span {
    font-size: 13px;
    font-weight: bold;
    margin-top: 3px;
  }
`;
export const CmTitle = styled.div`
  display: grid;
  & > span {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
  & > div {
    position: relative;
    font-size: 0.7rem;
    margin-right: 13px;
    color: #6f6f6f;
    margin-top: 3px;
    direction: ltr;
    text-align: right;
    font-weight: bold;

    &:before {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      right: -10px;
      top: 5px;
      border-radius: 100px;
      font-weight: 600;
    }
  }
`;
export const CmHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;
export const CommentItem = styled.div`
  border-radius: 5px;
  box-shadow: 0px 4px 6px -3px #b5b5b5;
  border: 1px solid #e6e6e6;
  margin-bottom: 11px;
`;
export const CommentList = styled.div`
  padding: 15px 5px;
`;
export const RateItemRange = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: inherit;
  width: ${({ w }) => w};
`;
export const RateItemRangeContainer = styled.div`
  width: 100%;
  position: relative;
  height: 7px;
  border-radius: 100px;
  overflow: hidden;
`;
export const RateItemName = styled.div``;
export const RateItem = styled.div`
  margin-bottom: 9px;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  align-items: center;
`;
export const RateList = styled.div`
  padding: 0 15px;
  font-size: 11px;
  margin-top: 10px;
  font-weight: 600;
`;

export const RateTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-right: 5px;
`;
export const RateContainer = styled.div`
  padding: 10px 5px;
  box-shadow: 0px 4px 6px -3px #b5b5b5;
`;
export const CommentContainer = styled.div`
  border-top: 1px solid #ccc;
`;
