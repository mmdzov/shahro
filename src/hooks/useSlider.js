import { useEffect } from "react";
import useForceUpdate from "./useForceUpdate";

const useSlider = (ref) => {
  const force = useForceUpdate();
  useEffect(() => {
    let g;
    if (ref.current) {
      clearInterval(g);
      let next = document.getElementsByClassName(
        "slider-control-centerright"
      )?.[0];
      let prev = document.getElementsByClassName(
        "slider-control-centerleft"
      )?.[0];
      next.children[0].innerHTML = "بعدی";
      prev.children[0].innerHTML = "قبلی";
    } else {
      g = setInterval(() => {
        force();
      }, 2000);
    }
    return () => {
      clearInterval(g);
    };
  }, [ref, force]);
};

export default useSlider;
