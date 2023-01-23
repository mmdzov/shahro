export default function zeroInTimeCustom(time) {
  let h = time?.toString();
  if (time < "10") return (h = "0" + h);
  return time;
}
