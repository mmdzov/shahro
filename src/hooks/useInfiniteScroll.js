import { useState, useEffect } from "react";

const useInfiniteScroll = () => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (
        Math.round(window.innerHeight + document.documentElement.scrollTop) ===
          Math.round(document.documentElement.getBoundingClientRect().height) &&
        !isFetching
      ) {
        setIsFetching(true);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
