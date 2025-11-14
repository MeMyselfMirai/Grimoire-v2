import { Role } from "./Role"


export type Meta = {
    id: "_meta",
    author: string,
    name: string
}

export type LiteralRole = {
    id: string
}

export type Script = [Meta, ...Array<LiteralRole | Role>]
