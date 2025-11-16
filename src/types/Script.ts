import { ROLES } from "../data/roleData"
import { Role } from "./Role"


export type Meta = {
    id: "_meta",
    author: string,
    name: string
}

export type RoleIdentifier = {
    id: string
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
