/* eslint-disable no-useless-escape */
const toFaDecimal = (nm) => {
  const fa = nm.toLocaleString("fa-IR");
  const rep = fa.replace(/[\/]/, "٫");
  return rep;
};

export default toFaDecimal;
