// TODO: determine if this can be folded into Visibility.ts
export enum Viability {
    /** Player is alive */
    Alive = "alive",

    /** Player is dead, but has not yet voted */
    Dead = "dead",

    /** Player is dead, and has used their remaining vote */
    NoVote = "dead_voted"
};
