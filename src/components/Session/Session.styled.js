const { default: styled } = require("styled-components");

export const Container = styled.div``;
export const SettingListContainer = styled.div`
  /* background: white; */
`;

export const SettingListTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0px 10px;
  margin-top: 15px;
  padding-bottom: 5px;
`;
export const SessionNotFound = styled.div`
  height: 175px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
`;
export const SettingListItem = styled.div`
  /* margin-top: 5px; */
`;

export const SettingItemContainer = styled.div`
  padding: 10px 13px;
  border-bottom: 1px solid #eee;
`;

export const SettingItemRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  margin: 13px 0px;
`;

export const Muted = styled.div`
  font-weight: 600;
  font-size: 0.8rem;
  min-height: 40px;
  align-items: center;
  display: flex;
  background: #f5f5f5;
  justify-content: center;
  padding: 15px 12px;
  color: #545454;
`;

export const Online = styled.div`
  color: #00a1ff;
  font-weight: 600;
  font-size: 1rem;
`;
export const RemoveSession = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #dc0000;
  font-weight: 600;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
`;

export const RemoveSingleSession = styled.button`
  font-size: 1rem;
  font-weight: 600;
  color: #dc0000;
  cursor: pointer;
`;
