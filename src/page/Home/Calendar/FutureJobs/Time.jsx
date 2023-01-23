import React from "react";

const Time = ({ gradient, time }) => {
  return (
    <div
      className={`rounded-sm bg-gradient-to-r ${gradient} text-white p-1 text-xs rounded-md px-2 `}>
      {time}
    </div>
  );
};

export default Time;
