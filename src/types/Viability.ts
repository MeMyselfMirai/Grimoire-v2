// TODO: determine if this can be folded into Visibility.ts
export enum Viability {
    /** Player is alive */
    Alive = "alive",

    /** Player is dead, but has not yet voted */
    Dead = "dead",

    /** Player is dead, and has used their remaining vote */
    NoVote = "dead_voted"
};

export function nextViability(current: Viability) {
    switch (current) {
        case Viability.Alive:
            return Viability.Dead;
        case Viability.Dead:
            return Viability.NoVote;
        case Viability.NoVote: 
            return Viability.Alive;
    }
}
