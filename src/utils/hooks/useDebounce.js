import { useState } from "react";

export default function useDebounce() {
  const [timeoutId, setTimeoutId] = useState(null);

  return (fn, e, timeout) => {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => fn(e), timeout));
  };
}
