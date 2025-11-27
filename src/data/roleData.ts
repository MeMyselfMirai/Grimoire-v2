import {  RoleData } from "../types/Role";
import { Team } from "../types/Team";
import { getJSON } from "../util";

/**
 * Whether the roles from external storage are loaded.
 */
export var rolesLoaded = false

/**
 * The roles that the application knows about. 
 */
export var ROLES: RoleData = {}

/**
 * The roles that are explicitly defined in storage. These are provided by TPI.
 */
export var BASE_ROLES: RoleData = {}

/**
 * Initialize the roles by fetching from external storage.
 */
export async function initRoles() {
    getJSON("tokens.json").then(role => BASE_ROLES = Object.freeze(ROLES = role))
}

/**
 * Check if the roles are loaded. 
 * @returns True iff there are any roles stored, which should indicate all roles are loaded. 
 */
export function areRolesLoading() {
    return Object.keys(ROLES).length === 0;
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
