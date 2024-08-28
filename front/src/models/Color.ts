const lightness = 60

export function toCssColor (index: number) {
    const hue = (index + 1) * 30
    const saturation = (Math.floor(hue / 360) + 1) * 50
    return `hsl(${hue} ${saturation} ${lightness})`
}