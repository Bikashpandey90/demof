export function handleReveal(inView: boolean, setReveal: any, scrollDown: boolean, justEntered: boolean) {
    if (inView) {
        if (scrollDown && justEntered) {
            setReveal(true);
        } else {
            setReveal(true);
        }
    } else {
        setReveal(false);
    }
}

export function rgbaToHex(rgba: string) {
    const [r, g, b] = rgba
        .replace("rgba(", "")
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map(Number);

    return "#" + [r, g, b]
        .map(x => x.toString(16).padStart(2, "0"))
        .join("");
}

export const hexToHSL = (H: string) => {
    let r = 0, g = 0, b = 0
    if (H.length === 4) {
        r = parseInt("0x" + H[1] + H[1])
        g = parseInt("0x" + H[2] + H[2])
        b = parseInt("0x" + H[3] + H[3])
    } else if (H.length === 7) {
        r = parseInt("0x" + H[1] + H[2])
        g = parseInt("0x" + H[3] + H[4])
        b = parseInt("0x" + H[5] + H[6])
    }
    r /= 255; g /= 255; b /= 255
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin
    let h = 0, s = 0, l = (cmax + cmin) / 2

    if (delta === 0) h = 0
    else if (cmax === r) h = ((g - b) / delta) % 6
    else if (cmax === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4
    h = Math.round(h * 60); if (h < 0) h += 360
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)
    return { h, s, l }
}

export const HSLToHex = (h: number, s: number, l: number) => {
    s /= 100; l /= 100
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0, g = 0, b = 0
    if (0 <= h && h < 60) [r, g, b] = [c, x, 0]
    else if (60 <= h && h < 120) [r, g, b] = [x, c, 0]
    else if (120 <= h && h < 180) [r, g, b] = [0, c, x]
    else if (180 <= h && h < 240) [r, g, b] = [0, x, c]
    else if (240 <= h && h < 300) [r, g, b] = [x, 0, c]
    else[r, g, b] = [c, 0, x]
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
export function generateCategoryColors(baseColorHex: string) {
    const { h, s, l } = hexToHSL(baseColorHex)

    // Primary: lighten by 18%
    const secondaryL = Math.min(l + 18, 100)
    const secondaryColor = HSLToHex(h, s, secondaryL)

    // Secondary: darken by 20%
    const primaryL = Math.max(l - 20, 0)
    const primaryColor = HSLToHex(h, s, primaryL)

    // Background: lighten by 12% and reduce saturation by 10%
    const bgL = Math.min(l + 12, 100)
    const bgS = Math.max(s - 10, 0)
    const backgroundColor = HSLToHex(h, bgS, bgL)

    return {
        primaryColor,
        secondaryColor,
        backgroundColor,
    }
}
