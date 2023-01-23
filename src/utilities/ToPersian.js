export default function toPersian(en) {
  let persian = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };
  let nums = (en + "")?.match(/[0-9]/g);
  for (let i = 0; i < nums?.length; i++) {
    en = (en + "")?.replace(nums[i], persian[nums[i]]);
  }
  return en + "";
}
