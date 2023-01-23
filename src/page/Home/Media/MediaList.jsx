import React, { memo } from "react";
import MediaItem from "./MediaItem";
import MediaListHomeLoading from "../../../components/Utilities/Loadings/MediaListLoading";
import styled from "styled-components";
import SlideTempList from "components/SlideTemp/SlideTempList";
import { ListItemContainer } from "components/SlideTemp/SlideTemp.styled";

const MediaList = ({ posts, loading, fromHome = false, ...props }) => {
  return (
    <div {...props}>
      {posts !== null && !loading ? (
        <Container className={`flex -mb-2`}>
          {posts.map((post) => (
            <ListItemContainer isSpecial>
              <MediaItem key={post.token} post={post} fromHome={fromHome} />
            </ListItemContainer>
          ))}
        </Container>
      ) : (
        <MediaListHomeLoading />
      )}
    </div>
  );
};
const Container = styled(SlideTempList)``;
export default memo(MediaList);
