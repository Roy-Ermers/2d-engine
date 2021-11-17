
import { Pane } from 'tweakpane';
import Game from 'game';

export default class Debugger {
    static start() {
        console.log("starting debugger.");
        const pane = new Pane({ title: "Debugger" });

        Game.onUpdate(() => pane.refresh());

        for (const entity of Game.entities) {
            const folder = (pane as any).addFolder({ title: `👾 ${[...entity.tags].join()}` });

            for (const component of entity.components) {
                const componentFolder = folder.addFolder({ title: `📦 ${component}` });

                const keys = Object.keys(Game.components.get(component)!.defaults);

                for (const key of keys) {
                    try {
                        componentFolder.addInput(entity.data, key);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    }
}