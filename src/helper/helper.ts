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
