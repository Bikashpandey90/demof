function handleReveal(inView: boolean, setReveal: any, scrollDown: boolean, justEntered: boolean) {
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
export default handleReveal
