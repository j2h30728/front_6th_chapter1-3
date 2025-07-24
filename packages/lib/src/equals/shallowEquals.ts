// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals(a: unknown, b: unknown): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (a === b) {
    return true;
  }
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return false;
  }
  // 3. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }
  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (!(key in b) || !Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
      return false;
    }
  }
  return true;
}
