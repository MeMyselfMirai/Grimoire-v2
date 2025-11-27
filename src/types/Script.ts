import { ROLES } from "../data/roleData"
import { isCompleteRole, Role } from "./Role"


export type Meta = {
    id: "_meta",
    author: string,
    name: string
}

export function isMeta(obj: any) {
    if (typeof obj !== "object" || obj === null) return false;
    if (obj.id !== "_meta") return false;
    if (typeof obj.author !== "string") return false;
    if (typeof obj.name !== "string") return false;

    return true;
}

export type RoleIdentifier = {
    id: string
}

function hasRoleId(obj: any): obj is RoleIdentifier {
    if (typeof obj !== "object") return false;
    if (typeof obj.id !== "string") return false;

    return true;
}

/**
 * Determine if a script item is a complete role item.
 * @param role A role object from the script
 * @returns true iff the item has all of its role data
 */
export function isRole(role: RoleIdentifier | Role): role is Role {
    return ROLES[role.id] === undefined;
}

export type Script = [Meta, ...Array<RoleIdentifier | Role>]

export function isGenericScript(obj: any): obj is Script {
    if (!Array.isArray(obj)) return false;

    if (!isMeta(obj[0])) return false;
    if (!obj.every(item => hasRoleId(item))) return false;

    return true;
}

export function isCompleteScript(obj: any): obj is Script {
    if (!Array.isArray(obj)) return false;
    if (!isMeta(obj[0])) return false;

    for (const role of obj.slice(1)) {
        if (typeof role !== "object") return false;
        if (typeof role.id !== "string") return false;
        if (isCompleteRole(role)) continue;
        console.log(role.id);
        if (ROLES[role.id] === undefined) {
            return false;
        }
    }

    return true;
}
