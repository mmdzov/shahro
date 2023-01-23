export default function numberPattern(num) {
  return num ? num.trim().match(/[0-9]/g)?.join("") ?? "" : "";
}
