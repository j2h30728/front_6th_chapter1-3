import { type FunctionComponent, type ReactNode } from "react";
import { shallowEquals } from "../equals";

interface Memoed<P> {
  props: P | undefined;
  result: ReactNode | Promise<ReactNode>;
}

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(Component: FunctionComponent<P>, equals = shallowEquals) {
  // 1. 이전 props를 저장할 ref 생성
  // 2. 메모이제이션된 컴포넌트 생성
  const memoed: Memoed<P> = {} as Memoed<P>;

  return function MemoizedComponent(props: P) {
    // 3. equals 함수를 사용하여 props 비교
    if (memoed.props !== undefined && equals(memoed.props, props)) {
      return memoed.result;
    }
    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    memoed.props = props;
    memoed.result = Component(props);
    return memoed.result;
  };
}
