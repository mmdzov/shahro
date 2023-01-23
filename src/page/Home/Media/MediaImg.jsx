import { Link } from "react-router-dom";
import styled from "styled-components";

const MediaImg = ({ src, token }) => {
  return (
    <Link
      style={{ cursor: "pointer" }}
      to={{
        pathname: "/media/post/" + token,
        param: token,
      }}
    >
      <Img src={src} className={"BgError"} alt="" />
    </Link>
  );
};

const Img = styled.img`
  height: initial;
  min-height: 180px;
  max-height: 180px;
  width: 100%;
  object-fit: cover;
  object-position: top;
`;

export default MediaImg;
