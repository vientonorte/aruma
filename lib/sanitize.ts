const UNSAFE_CHARS = /[<>"'`]/g;

export function sanitizeInput(value: string): string {
  return value.replace(UNSAFE_CHARS, "").replace(/\s+/g, " ").trim();
}
