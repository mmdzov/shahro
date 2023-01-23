export default function discount(p, d) {
  const price = +p;
  const discount = +d;
  const disc = Math.round(((discount - price) / price) * 100);
  const absolute = Math.abs(disc);
  const symbol = "%";
  return {
    fa: `${absolute.toLocaleString("fa-IR")}${symbol}`,
    en: `${absolute}${symbol}`,
    original: absolute,
  };
}
