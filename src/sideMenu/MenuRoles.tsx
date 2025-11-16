import { JSX, useContext } from "react";
import { GameContext, GameContextType } from "../data/gameState";
import { ROLES, TEAM_TYPES } from "../data/roleData";
import { GameState } from "../types/GameState";
import { Role } from "../types/Role";
import { isRole, RoleIdentifier } from "../types/Script";
import { Viability } from "../types/Viability";
import { Visibility } from "../types/Visibility";
import MenuRole from "./MenuRole";

type Storage<T> = {
    [key: string]: T
}

/**
 * Construct the side menu's individual items using the given script.
 * @param script The script in use. 
 * @param createCallback What the individual menu items should do to create a new token
 * @returns 
 */
export function populateJSX(gameState: GameState, createCallback: (id: string) => void): Storage<JSX.Element[]> {
    const script = gameState.script.slice(1) as (RoleIdentifier | Role)[];
    const tokens = gameState.playerTokens;

    const items: Storage<JSX.Element[]> = {}
    Object.keys(TEAM_TYPES).forEach(type => items[type] = []);

    const characterDict: Storage<number> = {}

    tokens.forEach(token => {
        if (!(token.id in characterDict)) {
            characterDict[token.id] = 0;
        }
        characterDict[token.id] += 1
    })

    script.forEach(r => {
        if (!isRole(r)) {
            r = ROLES[r.id];
        }
        const role = r as Role;
        if (!(role.team in items)) return;
        const amount = characterDict[role.id] ?? 0;
        items[role.team].push((
            <MenuRole roleId={role.id} amount={amount} key={role.id} callback={createCallback}></MenuRole>
        ));
    })

    return items;
}

function aggregateJSX(gameState: GameState, elements: Storage<JSX.Element[]>): JSX.Element[] {
    const tokens = gameState.playerTokens;

    const teamCounts: Storage<number> = {};
    tokens.forEach(token => {
        const team = ROLES[token.id].team;
        if (!(team in teamCounts)) teamCounts[team] = 0
        teamCounts[team] += 1;
    });

    return Object.values(TEAM_TYPES).map<JSX.Element>(team => (
        <div key={team.id}>
            <div className="SideMenu__header" style={{ color: team.color }}>{team.header}</div>
            <div className='MenuRoles__ratio'>{teamCounts[team.id] ?? 0}/0</div>
            <hr style={{ marginBlockEnd: "0em" }}></hr>
            {elements[team.id] ?? []}
        </div>
    ));
}

function MenuRoles() {

    const {gameState, setGameState} = useContext(GameContext) as GameContextType;

    function createToken(id: string) {
        setGameState(prevState => {
            const newToken = {
                id: id,
                uid: Date.now(),
                name: "",
                visibility: Visibility.Assigned,
                viability: Viability.Alive,
                position: {
                    top: window.innerHeight / 2 - 75,
                    left: window.innerWidth / 2 - 75,
                },
            };

            return {
                ...prevState,
                playerTokens: [...prevState.playerTokens, newToken],
            };
        });
    }

    const roleJSX = populateJSX(gameState, createToken);
    const sectionJSX = aggregateJSX(gameState, roleJSX);
    
    return (
        <>
            {sectionJSX}
        </>
    );
}

export default MenuRoles;
