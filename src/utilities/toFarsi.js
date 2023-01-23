const toFarsi = (n) => {
  let a = `${n}`.split("");
  let toNum = +a.filter((item) => /[0-9]/gi.test(item)).join("");
  toNum = toNum.toLocaleString("fa-IR");
  return `${toNum?.replace(",", "٫")}`;
};

export default toFarsi;
