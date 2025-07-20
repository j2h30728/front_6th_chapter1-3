import { useState } from "react";
import { shallowEquals } from "../equals";
import { useCallback } from "./useCallback";

export const useShallowState = <T>(initialValue: T | (() => T)) => {
  // useState를 사용하여 상태를 관리하고, shallowEquals를 사용하여 상태 변경을 감지하는 훅을 구현합니다.

  const [state, setSTate] = useState(() => initialValue);

  const compareState = useCallback((newState: T | (() => T)) => {
    setSTate((prevState) => {
      if (!shallowEquals(prevState, newState)) {
        return newState;
      }
      return prevState;
    });
  }, []);

  return [state, compareState];
};
