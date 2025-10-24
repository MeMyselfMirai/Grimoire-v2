export enum Team {
    /** Townsfolk -- Good players who help their team. */
    Townsfolk = "townsfolk",

    /** Outsider -- Good players who harm their team. */
    Outsider = "outsider",

    /** Minions -- Evil players who help their team. */
    Minion = "minion",
    
    /** Demons -- Evil players who don't want to die. */
    Demon = 'demon',

    /** Travellers -- Temporary players of either alignment */
    Traveller = "traveller",

    /** Fabled -- Administrative effects assigned a role name. */
    Fabled = "fabled",

    /** Quaint -- An undisclosed experimental role. Take caution, and avoid using! */
    Quaint = "quaint"
};
