export function toKebabCase(value: string) {
  return value
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('-')
}
