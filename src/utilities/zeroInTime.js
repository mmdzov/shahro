const zeroInTime = (t) => {
  const tm = new Date();
  let hs = tm.getHours().toString();
  let mn = tm.getMinutes().toString();
  if (t === "min") {
    if (mn < "10") mn = `0${mn}`;
    return mn;
  } else if (t === "hs") {
    if (hs < "10") hs = `0${hs}`;
    return hs;
  }
  return;
};

export default zeroInTime;
