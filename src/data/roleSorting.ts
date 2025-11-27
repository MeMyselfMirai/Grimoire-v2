import { Role } from "../types/Role";

const SAO_PREFIXES = [
    "You start knowing",
    "At night",
    "Each dusk*",
    "Each night",
    "Each night*",
    "Each day",
    "Once per game, at night",
    "Once per game, at night*",
    "Once per game, during the day",
    "Once per game",
    "On your 1st night",
    "On your 1st day",
    "On Night X",

    "You think",
    "You are",
    "You have",
    "You do not know",
    "You might",
    "You",

    "When you die",
    "When you learn that you died",
    "When",

    "If you die",
    "If you died",
    "If you are \"mad\"",
    "If you",
    "If the Demon dies",
    "If the Demon kills",
    "If the Demon",
    "If both",
    "If there are 5 or more players alive",
    "If",

    "All players",
    "All",
    "The 1st time",
    "The",

    "Good",
    "Evil",
    "Players",
    "Minions",
    // Fallthrough:
    "",
];

/**
 * Roughly index the sorting order of a character's text in
 * Steven-Approved Order (SAO). This implements the SAO specification used
 * for all future scripts as given at
 * https://bloodontheclocktower.com/news/sort-order-sao-update.
 *
 * @param {String} text The ability text of the character in question
 * @returns An integer value. This can be compared to the results from other
 * calls to this function. Lower values indicate that the role appears higher
 * on the script.
 */
function saoIndex(text: string) {
    // Hermit -- hardcoded exception
    if (text.startsWith("You have all Outsider abilities.")) {
        return -Infinity;
    }
    // Atheist -- hardcoded exception
    if (text.startsWith("The Storyteller can break the game rules")) {
        return Infinity;
    }

    for (let i = 0; i < SAO_PREFIXES.length; i++) {
        const prefix = SAO_PREFIXES[i];
        if (text.startsWith(prefix)) return i;
    }
    return Infinity;
}

/**
 * Implements the Steven-Approved Order (SAO) sorting used in all scripts, as
 * specified by https://bloodontheclocktower.com/news/sort-order-sao-update.
 *
 * First, sort the abilities based on the first few words of their ability text.
 * Consult {@link saoIndex} for more details.
 * If that cannot determine the order of two characters, then use
 * the length of the character text, with longer going later.
 * If that fails, use the length of the characters' names,
 * with longer going later.
 * If that fails, sort the characters alphabetically.
 * @param {Role} first One of the characters being compared
 * @param {Role} second One of the characters being compared
 * @returns an integer. If negative, then `first`  comes first in SAO.
 * Otherwise, `second` goes first in SAO.
 */
export function sortSao(first: Role, second: Role) {
    let out = saoIndex(first.ability) - saoIndex(second.ability);
    if (out === 0) {
        out = first.ability.length - second.ability.length;
    }
    if (out === 0) {
        out = first.name.length - second.name.length;
    }
    if (out === 0) {
        out = first.name > second.name ? 1 : -1;
    }
    return out;
}

export function sortAlphabetical(first: Role, second: Role) {
    return first.name > second.name ? 1 : -1
}

