import { RoleData } from "../types/Role";
import { getJSON } from "../util";

export var rolesLoaded = false

export var ROLES: RoleData = {}

export var BASE_ROLES: RoleData = {}

export async function initRoles() {
    getJSON("tokens.json").then(role => BASE_ROLES = Object.freeze(ROLES = role))
}

export function areRolesLoading() {
    return Object.keys(ROLES).length === 0;
}