import { RoleData } from "../types/Role";
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