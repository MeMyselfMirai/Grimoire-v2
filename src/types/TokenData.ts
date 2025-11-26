import { isPosition, Position } from "./Position";
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

export function isTokenData(obj: any): obj is TokenData {
    if (typeof obj !== "object" || obj === null) return false;

    if (typeof obj.id !== "string") return false;
    if (typeof obj.uid !== "number") return false;
    if (![Visibility.Assigned, Visibility.Bluff, Visibility.Hidden].includes(obj.visibility)) return false;
    if (![Viability.Alive, Viability.Dead, Viability.NoVote].includes(obj.viability)) return false;
    if (!isPosition(obj.position)) return false;

    return true;
}
