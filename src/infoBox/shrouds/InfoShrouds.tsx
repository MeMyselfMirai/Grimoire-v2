import { useContext } from "react";
import { RoleData, Shroud } from "../../types/Role";
import { InfoTabType } from "../InfoBox";
import { GameContext, GameContextType } from "../../data/gameState";
import ShroudCard from "./ShroudCard";
import { Script } from "../../types/Script";

export type ShroudMap = {
    [key: string]: Shroud
}

/**
 * The default shrouds. These shrouds appear in the info box no matter what 
 * characters are on the script. 
 */
const DEFAULT_SHROUDS: ShroudMap = Object.freeze({
    "GENERAL_INFO": { 
        "cardTitle": "General Info", 
        "cardColor": "green",
        "title": "You Learn...",
        "icons": 0
    },
    "USE_ABILITY": { 
        "cardTitle": "Use Your Ability?",
        "cardColor": "brown",
        "title": "Use Your Ability?", 
        "icons": 0
    },
    "CHOOSE_SOMEONE": {
        "cardTitle": "Choose Player(s)",
        "cardColor": "brown",
        "title": "Choose a Player", 
        "icons": 0
    },
    "CHOOSE_CHARACTER": {
        "cardTitle": "Choose Character(s)",
        "cardColor": "brown",
        "title": "Choose a Character", 
        "icons": 1
    },
    "MINIONS": { 
        "cardTitle": "This is Your Demon",
        "cardColor": "red",
        "title": "This Is Your Demon", 
        "icons": 0,
    },
    "DEMONS": {
        "cardTitle": "These Are Your Minions",
        "cardColor": "red",
        "title": "These Are Your Minions",
        "icons": 0,
    },
    "BLUFFS": {
        "cardTitle": "Demon Bluffs",
        "cardColor": "blue",
        "title": "These Characters are Not In Play", 
        "icons": 3
    },
    "CHOSEN_BY": {
        "cardTitle": "You Were Chosen By", 
        "cardColor": "blue",
        "title": "You Have Been Chosen By", 
        "icons": 1,
        "autofill": true
    },
    "YOU_ARE": { 
        "cardTitle": "You Are", 
        "cardColor": "purple",
        "title": "You Are", 
        "icons": 1,
        "autofill": true
    },
    "YOUR_ABILITY": { 
        "cardTitle": "Your Ability Text", 
        "cardColor": "purple",
        "title": "Your ability is: ", 
        "icons": 1,
        "autofill": true
    },
    "THIS_PLAYER_IS": {
        "cardTitle": "This Player Is", 
        "cardColor": "purple",
        "title": "This Player Is",
        "icons": 1,
        "autofill": true
    }
});

/**
 * Construct the entire shroud list, including shrouds relevant to 
 * some of the characters.
 * @param gameState The game state. 
 * @param roles 
 * @returns 
 */
function completeShroudList(script: Script, roles: RoleData) {
    const output = {...DEFAULT_SHROUDS};
    script.slice(1)
        .filter(role => roles[role.id]?.shrouds !== undefined)
        .forEach(role => {
            const shrouds = roles[role.id].shrouds!;
            for (const i in shrouds) {
                const shroudId = `${role.id}_${i}`;
                output[shroudId] = shrouds[i];
            }
        });
    return output;
}

/**
 * The Shrouds tab -- where Shrouds can be selected to be shown to players
 * @param focused If this tab is focused
 * @param focusCallback the callback to focus this tab. 
 * @returns 
 */
function InfoShrouds({focused, focusCallback}: InfoTabType) {
    const {gameState, roles} = useContext(GameContext) as GameContextType;
    const shrouds = completeShroudList(gameState.script, roles);
    
    const shroudJsx = [];
    for (const id of Object.keys(shrouds)) {
        shroudJsx.push(<ShroudCard key={id} shroud={shrouds[id]}></ShroudCard>);
    }

    return (
        <div className={"InfoShrouds__container InfoBox__tab" + (focused ? " InfoBox__focus" : "")}>
            <div 
                className="InfoBox__tabHeader InfoBox__tabHeaderGeneric" 
                style={{backgroundImage: "url('assets/light_green_swirls.webp')", backgroundPosition:"calc(50% - 140px)"}}
                onClick={focusCallback}
            >
                <img className="InfoBox__tabImage" src="assets/list.png" alt=""></img>
            </div>
            <div className="InfoShrouds__content">
                {shroudJsx}
            </div>
        </div>
    )
}

export default InfoShrouds;