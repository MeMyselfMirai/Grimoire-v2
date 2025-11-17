export enum Visibility {
    /** This token was given to a player, and is shown on the grim. */
    Assigned = "show",

    /** This token is a demon bluff. */
    Bluff = "bluff",

    /** This token is an internal aid that is not shown elsewhere. */
    Hidden = "hide"
};

export function nextVisibility(current: Visibility) {
    switch (current) {
        case Visibility.Assigned:
            return Visibility.Bluff;
        case Visibility.Bluff:
            return Visibility.Hidden;
        case Visibility.Hidden:
            return Visibility.Assigned;
    }
}
