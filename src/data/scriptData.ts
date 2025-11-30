import { Role } from "../types/Role";
import { LegacyScript, Script } from "../types/Script";
import { getJSON } from "../util";
import { importCustomRoles } from "./roleData";


const DEFAULT_SCRIPT_PATHS = Object.freeze([
    "scripts/Trouble Brewing.json",
    "scripts/Bad Moon Rising.json",
    "scripts/Sects and Violets.json",
    "scripts/The Carousel.json",
    "scripts/Gang's All Here.json",
    "scripts/Unreleased Experimental.json",
]);


export var DEFAULT_SCRIPTS: Script[] = [];

export var EXTRA_SCRIPTS: Script[] = [];

export var ALL_SCRIPTS: Script[] = [];


export async function initScripts() {
    DEFAULT_SCRIPT_PATHS.map(async (path, index) => {
        return (getJSON(path) as Promise<Script>).then(value => DEFAULT_SCRIPTS[index] = value)
    });
}

export function loadLocalScripts() {
    const localScriptData = localStorage.getItem("scripts") ?? "[]";

    EXTRA_SCRIPTS = JSON.parse(localScriptData);
    EXTRA_SCRIPTS.forEach(importCustomRoles);
    ALL_SCRIPTS = DEFAULT_SCRIPTS.concat(EXTRA_SCRIPTS);
}

function saveLocalScripts() {
    localStorage.setItem("scripts", JSON.stringify(EXTRA_SCRIPTS));
}

export function scriptId(script: Script): number {
    const scriptJSON = JSON.stringify(script)
    for (let i = 0; i < ALL_SCRIPTS.length; i++) {
        if (JSON.stringify(ALL_SCRIPTS[i]) === scriptJSON) return i;
    }
    return -1;
}

export function modernizeLegacyScript(script: LegacyScript): Script {
    const modern: Script = [script[0]];
    for (let i = 1; i < script.length; i++) {
        if (typeof script[i] === "string") {
            modern.push({id: script[i] as string});
        } else {
            modern.push(script[i] as Role);
        }
    }
    return modern;
}

export function commitNewScript(script: Script) {
    if (scriptId(script) !== -1) return;
    ALL_SCRIPTS.push(script);
    EXTRA_SCRIPTS.push(script);
    saveLocalScripts();
}
