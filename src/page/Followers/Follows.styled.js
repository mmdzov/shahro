const { default: styled } = require("styled-components");

export const Followers = styled.div``;
export const Followings = styled.div``;
export const ImgContainer = styled.div`
  margin-right: 5px;
  margin-left: 10px;
`;

export const CenterItem = styled.div`
  height: 100%;
  padding: 5px 5px;
  display: flex;
  flex-direction: column;
  justify-content: ${({ isUser }) => (isUser ? "space-between" : "center")};
`;
