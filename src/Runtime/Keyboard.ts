export default class Keyboard {
    private static pressedKeys: Set<string> = new Set();
    private static currentFrame: Set<string> = new Set();

    public static initialize() {
        window.addEventListener("keydown", e => this.handleKeyDown(e));
        window.addEventListener("keyup", e => this.handleKeyUp(e));
        window.addEventListener("blur", () => this.clearAll());
    }
    static clearAll() {
        this.pressedKeys.clear();
        this.currentFrame.clear();
    }

    private static handleKeyDown(event: KeyboardEvent) {
        this.addKey(event.key.toLowerCase());

        if (event.ctrlKey)
            this.addKey("ctrl");

        if (event.shiftKey)
            this.addKey("shift");

        if (event.metaKey)
            this.addKey("meta");

        if (event.altKey)
            this.addKey("alt");
    }

    private static handleKeyUp(event: KeyboardEvent) {
        this.pressedKeys.delete(event.key.toLowerCase());

        if (!event.ctrlKey)
            this.pressedKeys.delete("ctrl");

        if (!event.shiftKey)
            this.pressedKeys.delete("shift");

        if (!event.metaKey)
            this.pressedKeys.delete("meta");

        if (!event.altKey)
            this.pressedKeys.delete("alt");

        event.preventDefault();
    }

    private static addKey(key: string) {
        this.pressedKeys.add(key);
        this.currentFrame.add(key);
    }

    public static isDown(...keys: string[]): boolean {
        return !keys.some(x => !this.pressedKeys.has(x));
    }

    public static isPressed(...keys: string[]): boolean {
        return !keys.some(x => !this.currentFrame.has(x));
    }

    public static clearFrame() {
        this.currentFrame.clear();
    }
}

Keyboard.initialize();