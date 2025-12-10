import { Role } from "../types/Role";
import { LegacyScript, Script } from "../types/Script";

/**
 * The relative URLs for the various default scripts. 
 */
export const DEFAULT_SCRIPT_PATHS = Object.freeze([
    "scripts/Trouble Brewing.json",
    "scripts/Bad Moon Rising.json",
    "scripts/Sects and Violets.json",
    "scripts/The Carousel.json",
    "scripts/Gang's All Here.json",
    "scripts/Unreleased Experimental.json",
]);

/**
 * The default colorings used for the various default scripts.
 */
export const SCRIPT_COLORS = [
    "#F00000",
    "#C0C000",
    "#C000C0",
    "#00C000",
    "#c3ac87",
    "#0000F0",
]

/**
 * The default background images used for the various default scripts.
 */
export const SCRIPT_BACKGROUNDS = [
    "url(assets/backgrounds/red_circle_small.webp)",
    "url(assets/backgrounds/yellow_circle_small.webp)",
    "url(assets/backgrounds/purple_circle_small.webp)",
    "url(assets/backgrounds/green_circle_small.webp)",
    "url(assets/backgrounds/blue_circle_small.webp)",
    "url(assets/backgrounds/blue_circle_small.webp)",
]

/**
 * Get custom scripts from local storage, if any. 
 * @returns A list of all custom scripts we know of; may be empty.
 */
export function getLocalScripts(): Script[] {
    const localScriptJson = localStorage.getItem("scripts") ?? "[]";

    return JSON.parse(localScriptJson) as Script[];
}

/**
 * Commit custom scripts to storage. 
 * @param scripts A list of all known scripts. This must include the default scripts.
 */
export function saveLocalScripts(scripts: Script[]) {
    localStorage.setItem("scripts", JSON.stringify(scripts.slice(DEFAULT_SCRIPT_PATHS.length)));
}

/**
 * Convert a "legacy" or "shorthand" script, which simply enumerates role IDs
 * instead of creating psuedo-role objects, to a proper script for use in the app.
 * @param script A script that may or may not use the legacy formatting.
 * @returns A script that is guaranteed to have the same roles and proper formatting.
 */
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

/**
 * Find the index of the given script in the list of scripts.
 * @param script The script to search for. 
 * @param scripts The list of scripts to search in.
 * @returns The index, or -1 if not found.
 */
export function scriptIndexOf(script: Script, scripts: Script[]) {
    return scripts.map(x => JSON.stringify(x)).indexOf(JSON.stringify(script));
}

/**
 * Add a new script to the script list. If the "new" script is already in the list, do nothing.
 * @param newScript The script that may be added. 
 * @param scripts The list of all known scripts
 * @param setScripts A callback to add new scripts.
 */
export function commitNewScript(newScript: Script, scripts: Script[], setScripts: any) {
    if (newScript[0].name === "Select a Script") return;
    if (scriptIndexOf(newScript,scripts) >= 0) {
        return;
    }
    setScripts((scripts: Script[]) => {
        return [
            ...scripts,
            newScript
        ]
    });
}

/**
 * Delete a script by ID. 
 * @param scriptId The numerical index of the script in the list.
 * @param setScripts A callback to update the scripts.
 */
export function deleteScriptByIndex(scriptId: number, setScripts: any) {
    setScripts((scripts: Script[]) => {
        return [
            ...scripts.slice(0,scriptId),
            ...scripts.slice(scriptId+1)
        ];
    });
}

/**
 * Sanitize the name of a script, removing any spaces or newlines.
 * This is relevant because <Select> tags also strip these out, and not following
 * its requirements will cause jarring desyncs. 
 * @param script The script in question
 * @returns A sanitized name safe for use with <Select> tags.
 */
export function sanitizeName(script: Script) {
    return script[0].name.replaceAll(/[\n\t]+/g, " ").trim()
}
