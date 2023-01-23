export default function rmvZeroTime(time) {
  const t = time?.split("");
  try {
    if (t[0] === "0") return isNaN(+t[1]) ? 0 : +t[1];
    else return isNaN(+t.join("")) ? 0 : +t.join("");
  } catch (e) {}
}
