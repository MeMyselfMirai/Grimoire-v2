import { JSX, useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { ROLES, TEAM_DATA } from "../../data/roleData";
import { GameState } from "../../types/GameState";
import { Role } from "../../types/Role";
import { isRole, RoleIdentifier } from "../../types/Script";
import { Viability } from "../../types/Viability";
import { Visibility } from "../../types/Visibility";
import MenuRole from "./MenuRole";
import { MapLike } from "typescript";
import TeamSection from "./TeamSection";
import { Team } from "../../types/Team";

/**
 * Construct the side menu's individual items using the given script.
 * @param script The script in use. 
 * @param createCallback What the individual menu items should do to create a new token
 * @returns 
 */
export function populateJSX(gameState: GameState, createCallback: (id: string) => void): MapLike<JSX.Element[]> {
    const script = gameState.script.slice(1) as (RoleIdentifier | Role)[];
    const tokens = gameState.playerTokens;

    const items: MapLike<JSX.Element[]> = {}
    Object.keys(TEAM_DATA).forEach(type => items[type] = []);

    const characterDict: MapLike<number> = {}

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

function aggregateJSX(gameState: GameState, elements: MapLike<JSX.Element[]>): JSX.Element[] {
    const tokens = gameState.playerTokens;

    const teamCounts: MapLike<number> = {};
    tokens.forEach(token => {
        const team = ROLES[token.id].team;
        if (!(team in teamCounts)) teamCounts[team] = 0
        teamCounts[team] += 1;
    });

    return Object.values(Team).map<JSX.Element>((team: Team) => (
        <TeamSection teamId={team}>
            {elements[team] ?? []}
        </TeamSection>
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
