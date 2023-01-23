import convertFaNumsToEn from "./convertFaNumsToEn";

const currentDate = (index) => {
  let date = new Date();
  date = date.toLocaleDateString("fa-IR").split("/")[index];
  date = convertFaNumsToEn(date);
  return date;
};

export default currentDate;
