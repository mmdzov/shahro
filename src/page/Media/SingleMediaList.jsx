import React from 'react';
import MediaItem from './MediaItem';
import SingleMediaLoding from '../../components/Utilities/Loadings/SingleMediaLoding';

const MediaList = ({ posts, loading, isFetching }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:mx-8 mb-6`}>
      {posts !== null && !loading ? (
        posts.map((post, i) => (
          <MediaItem key={i} post={post} token={post.token} />
        ))
      ) : (
        <SingleMediaLoding />
      )}
    </div>
  );
};

export default MediaList;
