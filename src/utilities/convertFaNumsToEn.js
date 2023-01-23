const convertFaNumsToEn = (n) => {
  let pr = n.toString().split("");
  let nmb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let g = pr
    .map((item) => {
      let b = nmb.filter((t) => {
        return t.toLocaleString("fa-IR") === item && t;
      });
      return (item = b.toString());
    })
    .map((item) => {
      if (item === "") return (item = "0");
      else return item;
    }).join("");
  return +g;
};
export default convertFaNumsToEn;
