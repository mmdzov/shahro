import React from "react";
import { useSelector } from "react-redux";

const AuthorName = ({ classes, name, go = () => {} }) => {
  const { guestName } = useSelector(({ _MainReducer }) => _MainReducer);

  return (
    <div onClick={go} className={` cursor-pointer px-2 text-xs ${classes}`}>
      {name ?? guestName}
    </div>
  );
};

export default AuthorName;
