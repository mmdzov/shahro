/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useLastPosition = (lastPosition, isFast = false) => {
  const { bar } = useParams();
  if (isFast) {
    if (lastPosition > 0 && document.body.offsetTop !== lastPosition) {
      setTimeout(() => {
        window.scrollTo({ left: 0, top: lastPosition, behavior: "auto" });
      }, 0);
    }
  }
  useEffect(() => {
    if (!isFast) {
      if (!bar) {
        document.getElementsByTagName("html")[0].style.scrollBehavior = "unset";
        if (lastPosition > 0 && document.body.offsetTop !== lastPosition) {
          setTimeout(() => {
            window.scrollTo({ left: 0, top: lastPosition, behavior: "auto" });
          }, 0);
        }
        return () => {
          document.getElementsByTagName("html")[0].style.scrollBehavior =
            "auto";
        };
      }
    }
  }, [document.body.offsetTop]);
};

export default useLastPosition;
