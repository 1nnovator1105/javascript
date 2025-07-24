export function getColorClass(
  color: 'indigo' | 'purple' | 'violet',
  shade: number,
  type: 'bg' | 'text' | 'border' | 'ring' = 'bg'
): string {
  return `${type}-${color}-${shade}`;
}