import { useEffect, useState } from "react";
import { isConnectionRestored } from "../connector";

//хук для того чтобы при переподключении(рефреше) не мигал адрес
export function useIsConnectionRestored(): boolean {
  const [connectionRestored, setConnectionRestored] = useState(false);

  useEffect(() => {
    isConnectionRestored.then(() => setConnectionRestored(true));
  }, []);

  return connectionRestored;
}
