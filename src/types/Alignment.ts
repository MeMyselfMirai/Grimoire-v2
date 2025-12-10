import { Role } from "./Role";
import { Team } from "./Team";
import { TokenData } from "./TokenData";


export enum Alignment {
    Good = "Good",
    Evil = "Evil",
    Traveller = "Traveller",
    Storyteller = "Storyteller"
}

export function getExpectedAlignment(role: Role): Alignment {
    switch (role.team) {
        case Team.Townsfolk:
        case Team.Outsider:
            return Alignment.Good;
        case Team.Minion:
        case Team.Demon:
            return Alignment.Evil;
        case Team.Traveller:
            return Alignment.Traveller;
        case Team.Fabled:
        case Team.Loric:
            return Alignment.Storyteller;
    }
}

export function getNextAlignment(role: Role, token: TokenData): Alignment {
    switch (role.team) {
        case Team.Fabled:
        case Team.Loric:
            return Alignment.Storyteller;
        case Team.Townsfolk:
        case Team.Outsider:
            // Written like this to avoid edge-cases with missing alignments
            return token.alignment === Alignment.Evil ? Alignment.Good : Alignment.Evil;
        case Team.Minion:
        case Team.Demon:
            return token.alignment === Alignment.Good ? Alignment.Evil : Alignment.Good;
        case Team.Traveller:
            break;
    }
    switch (token.alignment) {
        case Alignment.Evil:
            return Alignment.Traveller;
        case Alignment.Good:
            return Alignment.Evil;
        case Alignment.Traveller:
        default:
            return Alignment.Good;
    }
}
