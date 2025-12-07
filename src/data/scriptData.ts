import { Role } from "../types/Role";
import { LegacyScript, Script } from "../types/Script";


export const DEFAULT_SCRIPT_PATHS = Object.freeze([
    "scripts/Trouble Brewing.json",
    "scripts/Bad Moon Rising.json",
    "scripts/Sects and Violets.json",
    "scripts/The Carousel.json",
    "scripts/Gang's All Here.json",
    "scripts/Unreleased Experimental.json",
]);

export const SCRIPT_COLORS = [
    "#F00000",
    "#C0C000",
    "#C000C0",
    "#00C000",
    "#c3ac87",
    "#0000F0",
]

export const SCRIPT_BACKGROUNDS = [
    "url(assets/backgrounds/red_circle_small.webp)",
    "url(assets/backgrounds/yellow_circle_small.webp)",
    "url(assets/backgrounds/purple_circle_small.webp)",
    "url(assets/backgrounds/green_circle_small.webp)",
    "url(assets/backgrounds/blue_circle_small.webp)",
    "url(assets/backgrounds/blue_circle_small.webp)",
]

export function getLocalScripts(): Script[] {
    const localScriptJson = localStorage.getItem("scripts") ?? "[]";

    return JSON.parse(localScriptJson) as Script[];
}

export function saveLocalScripts(scripts: Script[]) {
    localStorage.setItem("scripts", JSON.stringify(scripts.slice(DEFAULT_SCRIPT_PATHS.length)));
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

export function commitNewScript(newScript: Script, scripts: Script[], setScripts: any) {
    if (scripts.map(x => JSON.stringify(x)).includes(JSON.stringify(newScript))) return;
    if (newScript[0].name === "Select a Script") return;
    setScripts((scripts: Script[]) => {
        return [
            ...scripts,
            newScript
        ]
    });
}

export function deleteScriptByIndex(scriptId: number, setScripts: any) {
    setScripts((scripts: Script[]) => {
        return [
            ...scripts.slice(0,scriptId),
            ...scripts.slice(scriptId+1)
        ];
    });
}

export function sanitizeName(name: string) {
    return name.replaceAll(/[\n\t]+/g, " ").trim()
}
