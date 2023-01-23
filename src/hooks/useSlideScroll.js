import { useState } from "react";

const useSlideScroll = (list, mode) => {
  const [lst, setLst] = useState(list);
  const handleError = (token) => {
    if (!mode) {
      let s = [...lst];
      let i = s.findIndex((item) => item.token === token);
      s[i].error = true;
      setLst(s);
    } else if (mode === "slider") {
      let i = list?.findIndex((item) => item.token === token);
      list[i].error = true;
      setLst(list);
    } else if (mode === "adsCategory") {
      const s = [...list];
      let i = s?.findIndex((item) => item.id === token);
      s[i].error = true;
      setLst(s);
    } else if (mode === "byImg") {
      const s = [...list];
      let i = s?.findIndex((item) => item.id === token);
      s[i].error = true;
      setLst(list);
    }
  };
  return { handleError, lst, setLst };
};

export default useSlideScroll;
