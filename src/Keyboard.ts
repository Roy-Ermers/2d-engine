type modifierKeys = {
    ctrl: boolean;
    shift: boolean;
    meta: boolean;
    alt: boolean;
};

export default class Keyboard {
    private static pressedKeys: Set<string> = new Set();
    private static modifiers: modifierKeys = {
        ctrl: false,
        shift: false,
        meta: false,
        alt: false
    };

    public static initialize() {
        window.addEventListener("keydown", e => this.handleKeyDown(e));
        window.addEventListener("keyup", e => this.handleKeyUp(e));
    }

    private static handleKeyDown(event: KeyboardEvent) {
        this.pressedKeys.add(event.key);

        this.modifiers.ctrl = event.ctrlKey;
        this.modifiers.shift = event.shiftKey;
        this.modifiers.meta = event.metaKey;
        this.modifiers.alt = event.altKey;

    }

    private static handleKeyUp(event: KeyboardEvent) {
        this.pressedKeys.delete(event.key);

        this.modifiers.ctrl = event.ctrlKey;
        this.modifiers.shift = event.shiftKey;
        this.modifiers.meta = event.metaKey;
        this.modifiers.alt = event.altKey;

        event.preventDefault();
    }

    public static isDown(key: string, modifiers?: Partial<modifierKeys>): boolean {
        if (modifiers) {
            for (const [key, pressed] of Object.entries(modifiers)) {
                if (this.modifiers[key as keyof modifierKeys] !== pressed) {
                    return false;
                }
            }
        }

        return this.pressedKeys.has(key);
    }
}

Keyboard.initialize();