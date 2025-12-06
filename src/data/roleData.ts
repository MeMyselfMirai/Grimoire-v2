import {  isCompleteRole, RoleData } from "../types/Role";
import { Script } from "../types/Script";
import { Team } from "../types/Team";


export function appendCustomRoles(script: Script, roles: RoleData, setRoles: any) {
    script.slice(1).forEach(role => {
        if (roles[role.id] === undefined) {
            if (!isCompleteRole(role)) throw new Error(`Script contains a role "${role.id}" for which there is no data!`);
            setRoles((roles: RoleData) => {
                return {
                    ...roles,
                    [role.id]: role
                }
            });
        }
    });
}


type TeamData = {
    [key in Team]: {
        id: string;
        header: string;
        color: string;
    };
};

/**
 * The teams that appear in the side menu when selecting a character.
 */
export const TEAM_DATA: TeamData = {
    [Team.Townsfolk]: {
        "id": "townsfolk",
        "header": "Townsfolk",
        "color": "#0033cc",
    },
    [Team.Outsider]: {
        "id": "outsider",
        "header": "Outsiders",
        "color": "#1a53ff",
    },
    [Team.Minion]: {
        "id": "minion",
        "header": "Minions",
        "color": "#b30000",
    },
    [Team.Demon]: {
        "id": "demon",
        "header": "Demons",
        "color": "#e60000",
    },
    [Team.Traveller]: {
        "id": "traveller",
        "header": "Travellers",
        "color": "#6600ff",
    },
    [Team.Fabled]: {
        "id": "fabled",
        "header": "Fabled",
        "color": "#b3b300",
    },
    [Team.Loric]: {
        "id": "loric",
        "header": "Loric",
        "color": "#00b300",
    },
}
