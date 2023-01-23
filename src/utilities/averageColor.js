const averageColor = (ave) => {
  let n = +ave.toString().split(".")[0];
  if (n === 5) return "#0eca47";
  else if (n === 4) return "#7ac11b";
  else if (n === 3) return "#ef8d14";
  else if (n === 2) return "#b15d06";
  else if (n === 1) return "#e25924";
  else if (n === 0) return "#e62828";
};

export default averageColor;
