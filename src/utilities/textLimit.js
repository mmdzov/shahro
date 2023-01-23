export default function textLimit(text, limit = 23) {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}
