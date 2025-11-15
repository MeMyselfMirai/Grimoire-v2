import { Position } from "./Position";
import { Viability } from "./Viability";
import { Visibility } from "./Visibility";

export type TokenData = {
    /** The role ID of the token: what role it has. */
    id: string;

    /** The Unique ID of the token: persists even if its role changes. */
    uid: number;

    /** The name of the player with this token. */
    name: string;

    /** The visibility state of this token; whether it should be shown. */
    visibility: Visibility;

    /** The viability state of this token -- whether it is alive or can vote. */
    viability: Viability;

    /** The position of this token on screen. */
    position: Position;
};
