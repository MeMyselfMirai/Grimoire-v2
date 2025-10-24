import { Position } from "./Position";
import { Team } from "./Team";
import { Viability } from "./Viability";
import { Visibility } from "./Visibility";

export type TokenData = {
    /** The role ID of the token: what role it has. */
    id: string;

    /** The Unique ID of the token: persists even if its role changes. */
    uid: number;

    // TODO: determine if this is redundant
    /** The "team" of this player -- what type their role is. */
    team: Team;

    /** The visibility state of this token; whether it should be shown. */
    visibility: Visibility,

    /** The viability state of this token -- whether it is alive or can vote. */
    viability: Viability

    /** The position of this token on screen. */
    position: Position
};
