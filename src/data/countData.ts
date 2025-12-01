import { Team } from "../types/Team";
import { TokenData } from "../types/TokenData";
import { Visibility } from "../types/Visibility";
import { ROLES } from "./roleData";


const ROLE_DISTRIBUTION: Array<[number, number, number]> = [
    // Dummy values
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    [0,0,0],
    // 5 - Teensyville
    [3,0,1],
    [3,1,1],
    // 7
    [5,0,1],
    [5,1,1],
    [5,2,1],
    // 10
    [7,0,2],
    [7,1,2],
    [7,2,2],
    // 13
    [9,0,3],
    [9,1,3],
    [9,2,3],
]

export function roleDistribution(playerCount: number) {
    return ROLE_DISTRIBUTION[playerCount];
}

export function playerCounts(tokens: TokenData[]): { [key in Team]: number } {
    const output: {[key in Team]: number} = {
        [Team.Townsfolk]: 0,
        [Team.Outsider]: 0,
        [Team.Minion]: 0,
        [Team.Demon]: 0,
        [Team.Traveller]: 0,
        [Team.Fabled]: 0,
        [Team.Loric]: 0
    };
    for (const token of tokens) {
        if (token.visibility !== Visibility.Assigned) continue;
        const role = ROLES[token.id];
        output[role.team]++;
    }
    return output;
}
