import { RoleData } from "./Role"


type Meta = {
    id: "_meta",
    author: string,
    name: string
}

type LiteralRole = {
    id: string
}

export type Script = [Meta, ...Array<LiteralRole | RoleData>]
