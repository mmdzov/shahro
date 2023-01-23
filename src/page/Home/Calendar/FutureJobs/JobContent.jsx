import React from "react";

const JobContent = ({ date, title }) => {
  return (
    <div className={`flex flex-col px-3`}>
      <h2 className={`font-bold text-sm`}>{title}</h2>
      <h3 className={`text-xs`}>{date}</h3>
    </div>
  );
};

export default JobContent;
