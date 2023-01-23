import React from 'react';
import classesCSS from './PostTime.module.css';

const PostTime = ({ classes, time }) => {
  return (
  <h6 className={`${classesCSS.PostTime} text-xs text-gray-500 ${classes}`}>
    {time}
  </h6>
  );
};

export default PostTime;
