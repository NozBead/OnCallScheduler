const lightness = 60

export function toCssColor(index: number) {
  const hue = index * 40
  const saturation = (Math.floor(hue / 360) + 1) * 35
  return `hsl(${hue} ${saturation} ${lightness})`
}
