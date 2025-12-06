import { JSX, useContext } from "react";
import "./CharacterSelect.css"
import { GameContext, GameContextType } from "../data/gameState";
import { TEAM_DATA } from "../data/roleData";
import { GameState } from "../types/GameState";
import { Role, RoleData } from "../types/Role";
import { isRole, RoleIdentifier } from "../types/Script";
import SampleToken from "../token/SampleToken";
import { MapLike } from "typescript";

/**
 * Construct the token select menu's individual items using the given script.
 * @param script The script in use. 
 * @param callback What the individual menu items should do to create a new token
 * @returns 
 */
function populateJSX(gameState: GameState, roles: RoleData, callback: (id: string) => void): MapLike<JSX.Element[]> {
    const script = gameState.script.slice(1) as (RoleIdentifier | Role)[];

    const items: MapLike<JSX.Element[]> = {}
    Object.keys(TEAM_DATA).forEach(type => items[type] = []);

    script.forEach(r => {
        if (!isRole(r, roles)) {
            r = roles[r.id];
        }
        const role = r as Role;
        if (!(role.team in items)) return;
        items[role.team].push((
            <SampleToken
                id={role.id}
                key={role.id}
                className={"CharacterSelect__token General__backgroundImage"}
                onClick={() => callback(role.id)}
            />
        ));
    })

    return items;
}

function aggregateJSX(gameState: GameState, roles: RoleData, elements: MapLike<JSX.Element[]>): JSX.Element[] {
    const tokens = gameState.playerTokens;

    const teamCounts: MapLike<number> = {};
    tokens.forEach(token => {
        const team = roles[token.id].team;
        if (!(team in teamCounts)) teamCounts[team] = 0
        teamCounts[team] += 1;
    });

    return Object.values(TEAM_DATA).filter(team => elements[team.id]?.length > 0).map<JSX.Element>(team => (
        <div key={team.id}>
            <div className="CharacterSelect__teamHeader" style={{ color: team.color }}>{team.header}</div><br />
            <div id="mutate_menu_townsfolk">
                {elements[team.id] ?? []}
            </div><br />
        </div>
    ));
}

export default function CharacterSelect() {
    const { gameState, appState, setAppState, roles } = useContext(GameContext) as GameContextType;

    if (appState.characterSelectCallback === undefined) {
        return <></>
    }
    const onSelect = appState.characterSelectCallback!;

    function closeMenu(selection?: string) {
        if (selection !== undefined) onSelect(selection);
        setAppState(oldState => {
            return {
                ...oldState,
                characterSelectCallback: undefined
            }
        });
    }

    const roleJSX = populateJSX(gameState, roles, closeMenu);
    const sectionJSX = aggregateJSX(gameState, roles, roleJSX);


    return (
        <div className="CharacterSelect__container" onClick={() => closeMenu()}>
            <div className="CharacterSelect__background">
                <div className="CharacterSelect__content">
                    {sectionJSX}
                </div>
            </div>
        </div>
    )
}
