export function withAlpha(hex: string, alpha: number) {
  const a = Math.max(0, Math.min(1, alpha));
  const to255 = Math.round(a * 255).toString(16).padStart(2, '0');

  if (/^#([0-9a-f]{3})$/i.test(hex)) {
    const r = hex[1], g = hex[2], b = hex[3];
    return `#${r}${r}${g}${g}${b}${b}${to255}`;
  }
  if (/^#([0-9a-f]{6})$/i.test(hex)) return `${hex}${to255}`;
  return `#0000001F`;
}
