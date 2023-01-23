import { useEffect, useState } from "react";

const useLoading = (data) => {
  const [l, setL] = useState(true);
  useEffect(() => {
    if (data && data instanceof Array && data?.length > 0) {
      setL(false);
    } else if (
      data &&
      data instanceof Object &&
      Reflect.ownKeys(data)?.length > 0
    )
      setL(false);
  }, [data]);
  return { loading: l, setLoading: setL };
};

export default useLoading;
