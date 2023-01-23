const { default: convertFaNumsToEn } = require("./convertFaNumsToEn");

const getFullYear = () => {
  const cvt = convertFaNumsToEn;
  const dt = new Date().toLocaleDateString("fa-IR").split("/");
  const year = cvt(dt[0]);
  const month = cvt(dt[1]);
  const day = cvt(dt[2]);
  return { year, month, day };
};

export default getFullYear;
