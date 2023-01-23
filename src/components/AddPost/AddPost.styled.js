import styled from "styled-components";

export const AddPostHeader = styled.div`
  padding-bottom: 30px;
  & > div:first-child {
    display: flex;
    justify-content: space-around;
    padding-top: 15px;
    font-size: 0.9rem;
    font-weight: 600;
    align-items: center;

    & > div:nth-child(2) {
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
  & > div:last-child {
    display: flex;
    align-items: center;
    padding: 0 25px;
    margin-top: 40px;
  }
`;

export const Form = styled.form``;

export const AddPostForm = styled.div`
  padding: 50px 15px;
  padding-top: 10px;

  /* background: white; */
  color: black;
  /* border-radius: 20px 20px 0 0; */
  border-radius: 0;
`;

export const PostFieldWrapper = styled.div`
  margin-top: 20px;
`;

export const PostField = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  direction: ltr;
`;

export const PostFieldTitle = styled.div`
  font-size: 0.8rem;
  margin-bottom: 5px;
  color: #0072ff;
  cursor: pointer;
  font-weight: 600;
`;

export const PostFieldList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
  max-height: 190px;
  margin-bottom: 20px;
`;
export const PostFieldItem = styled.div`
  width: 160px;
  height: 190px;
  margin-right: 10px;
  margin-top: 5px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  & > img,
  & > video {
    width: inherit;
    height: inherit;
  }
`;
export const ModalSelectList = styled.form`
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  & > div {
    padding-right: 15px;
    cursor: pointer;
    &:hover {
      background-color: #efefef;
    }
  }
`;
export const ModalSelectItem = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  & > div {
  }
  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
`;
export const VideoContainer = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;
export const VideoIcon = styled.div`
  position: absolute;
  left: 63px;
  background: #1787e8;
  color: white;
  border-radius: 100px;
  padding: 5px;
  width: 35.45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999999999;
`;
