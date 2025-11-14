import { Role } from "./Role"


export type Meta = {
    id: "_meta",
    author: string,
    name: string
}

export type RoleIdentifier = {
    id: string
}

export type Script = [Meta, ...Array<RoleIdentifier | Role>]
