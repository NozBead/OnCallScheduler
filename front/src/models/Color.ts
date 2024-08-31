const lightness = 60

export function toCssColor(index: number) {
  const hue = index * 45
  const saturation = (Math.floor(hue / 360) + 1) * 25
  return `hsl(${hue} ${saturation} ${lightness})`
}
