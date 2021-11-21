
import { Pane } from 'tweakpane';
import Game from 'Engine';

export default class Debugger {
    static start() {
        console.log("starting debugger.");
        const pane = new Pane({ title: "Debugger" });

        Game.onUpdate(() => pane.refresh());

        for (const entity of Game.entities) {
            const folder = (pane as any).addFolder({ title: `👾 ${[...entity.tags].join()}` });

            for (const [component, data] of entity.getAllComponents()) {
                const componentFolder = folder.addFolder({ title: `📦 ${component.constructor.name}` });

                const keys = Object.keys(data);

                for (const key of keys) {
                    try {
                        componentFolder.addInput(data, key);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}