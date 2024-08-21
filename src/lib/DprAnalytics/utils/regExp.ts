export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function turnValueToRegExp(value: string): RegExp {
  return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
