const lightness = 60

export function toCssColor(index: number) {
  const hue = index * 45
  const saturation = 10 + (Math.floor(hue / 360) + 1) * 30
  return `hsl(${hue} ${saturation} ${lightness})`
}
