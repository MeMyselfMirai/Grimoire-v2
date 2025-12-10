import { GameState } from "../types/GameState";
import { isCompleteRole, RoleData } from "../types/Role";
import { Script } from "../types/Script";
import { getJSON } from "../util";
import { DEFAULT_SCRIPT_PATHS, getLocalScripts, scriptIndexOf } from "./scriptData";

/**
 * Initialize the application by fetching data from the backend. 
 * @param gameState The game state. Stored locally, so we retrieved it already. 
 * @param setRoles A callback to set the global role data.
 * @param setScripts A callback to set the global script data. 
 * @param setGameState A callback to set the global game state.
 */
export default async function init(gameState: GameState, setRoles: any, setScripts: any, setGameState: any) {
    const roles = await getJSON("tokens.json") as RoleData;
    const scripts: Script[] = [];
    for (const path of DEFAULT_SCRIPT_PATHS) {
        const script = await getJSON(path) as Script;
        scripts.push(script);
    }

    const localScripts = getLocalScripts().concat([gameState.script]);
    localScripts.forEach(script => {
        if (scriptIndexOf(script, scripts) >= 0) return;
        if (script[0].name === "Select a Script") return;
        scripts.push(script);
        script.slice(1).forEach(role => {
            if (roles[role.id] !== undefined) return;
            if (!isCompleteRole(role)) {
                throw new Error(`Script contains a role "${role.id}" for which there is no data!`);
            }
            roles[role.id] = role;
        });
    });

    setRoles(roles);
    setScripts(scripts);
    setGameState((state: GameState) => {
        if (state.script.length > 1) return state;
        return {
            ...state,
            script: scripts[0]
        }
    })
}