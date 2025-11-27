import { Script } from "../types/Script";
import { getJSON } from "../util";


const DEFAULT_SCRIPT_PATHS = Object.freeze([
    "scripts/Trouble Brewing.json",
    "scripts/Bad Moon Rising.json",
    "scripts/Sects and Violets.json",
    "scripts/The Carousel.json",
    "scripts/Gang's All Here.json",
    "scripts/Unreleased Experimental.json",
]);

export const DEFAULT_SCRIPTS: Script[] = [];



export async function initScripts() {
    DEFAULT_SCRIPT_PATHS.map(async (path, index) => {
        return (getJSON(path) as Promise<Script>).then(value => DEFAULT_SCRIPTS[index] = value);
    });
}