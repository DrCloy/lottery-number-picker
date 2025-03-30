import { useEffect, useState } from "react";
import type { Observable } from "./observable";

export function useObservable<T extends Observable>(observable: T): T {
  const [, refresh] = useState({});

  useEffect(() => {
    return observable.addListener(() => refresh({}));
  }, []);

  return observable;
}
