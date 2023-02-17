import { useEffect, useState } from "react";
import shallow from "zustand/shallow";

const useGetStorage = <T, F>(store: (callback : (state : T) => unknown) => unknown, storeCallback: (state: T) => F) => {
  const [state, setState] = useState<F>();
  const result = store(storeCallback, shallow) as F;
  useEffect(() => {
    setState(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);
  return state;
};

export default useGetStorage;