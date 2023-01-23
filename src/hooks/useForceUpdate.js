/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const useForceUpdate = () => {
  const [state, setState] = useState(0);
  return () => setState((prev) => prev + 1);
};

export default useForceUpdate;
