// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals(a: unknown, b: unknown): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return a === b;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }
    if (!deepEquals((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
      return false;
    }
  }

  return true;
}
