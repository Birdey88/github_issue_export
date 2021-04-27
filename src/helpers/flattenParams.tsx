export default function flattenParams(params) {
  let array = [];
  if (params) {
    for (const [type, param] of Object.entries(params)) {
      if (type === "title" && param !== " in:title") array.push(param);
      if (type === "milestone" && param !== "milestone:") array.push(param);
      if (type === "state" && param !== "state:") array.push(param);
    }
    return array.join(" ");
  }
  return "";
}
