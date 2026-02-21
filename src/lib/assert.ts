/**
 * Runtime invariant check. Throws if condition is false.
 * Use for validating assumptions and catching programmer errors early.
 * @see nasa-code-guidelines.md Rule 5 (Assertions)
 */
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Invariant failed: ${message}`);
  }
}
