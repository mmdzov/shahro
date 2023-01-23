import React from 'react';
import classes from './TagItem.module.css';


/**
 * @deprecated
*/
const TagItem = ({ text, handleClick }) => {
  return (
    <div
      className={` ${classes.TagItem} rounded-lg shadow-sm bg-white py-1 px-2 border border-gray-300 mx-1 font-bold cursor-pointer flex-shrink-0 my-2 `}
      onClick={handleClick}>
      {text}
    </div>
  );
};

export default TagItem;
