export function textEllipsis(text: string, length: number): string {
  if (!text) return ""
  if (length <= 0) return ""

  return text.length > length
    ? text.slice(0, length).trimEnd() + "…"
    : text
}
