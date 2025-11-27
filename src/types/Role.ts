import { Team } from "./Team"

export type RoleData = {
    [key: string]: Role
}

export type Jinx = {
    id: string,
    reason: string
}

function isJinx(obj: any): obj is Jinx {
    if (typeof obj !== "object") return false;
    if (typeof obj.id !== "string") return false;
    if (typeof obj.reason !== "string") return false;

    return true;
}

export type Shroud = {
    cardTitle: string,
    cardColor: string,
    title: string,
    icons?: number
    iconsFixed?: boolean
    autofill?: boolean
    epilog?: string
}

function isShroud(obj: any): obj is Shroud {
    if (typeof obj !== "object") return false;
    if (typeof obj.cardTitle !== "string") return false;

    if (typeof obj.cardColor !== "string") return false;
    if (!["blue", "brown", "green", "orange", "purple", "red"].includes(obj.cardColor)) return false;

    if (typeof obj.title !== "string") return false;

    if (obj.icons !== undefined && typeof obj.icons !== "number") return false;
    if (obj.icons < 0) return false;

    if (obj.iconsFixed !== undefined && typeof obj.iconsFixed !== "boolean") return false;
    if (obj.autofill !== undefined && typeof obj.autofill !== "boolean") return false;

    if (obj.epilog !== undefined && typeof obj.epilog !== "string") return false;

    return true;
}

export type Role = {
    id: string,
    name: string,
    ability: string,
    flavor?: string,
    team: Team,
    image: string,
    reminders?: string[],
    firstNight?: number,
    firstNightReminder?: string,
    otherNight?: number,
    otherNightReminder?: string,
    // change_makeup?: any[],
    shrouds?: Shroud[]
    jinx?: Jinx[]
}

export function isCompleteRole(obj: any): obj is Role {
    if (typeof obj !== "object") return false;

    if (typeof obj.id !== "string") return false;
    if (typeof obj.name !== "string") return false;
    if (typeof obj.flavor !== "string" && obj.flavor !== undefined) return false;
    if (!Object.values(Team).includes(obj.team)) return false;
    if (typeof obj.image !== "string") return false; // TODO: should allow for arrays. 

    if (obj.reminders !== undefined) {
        if (!Array.isArray(obj.reminders)) return false;
        if (!obj.reminders.every((r: any) => typeof r === "string")) return false;
    }
    
    if (obj.firstNight !== undefined) {
        if (typeof obj.firstNight !== "number") return false;
        // Night order specified requires reminder text. 
        if (obj.firstNightReminder === undefined && obj.firstNight <= 0) return false;
        if (typeof obj.firstNightReminder !== "string") return false;
    }

    if (obj.otherNight !== undefined) {
        if (typeof obj.otherNight !== "number") return false;
        // Night order specified requires reminder text. 
        if (obj.otherNightReminder === undefined && obj.otherNight <= 0) return false;
        if (typeof obj.otherNightReminder !== "string") return false;
    }

    if (obj.shrouds !== undefined) {
        if (!Array.isArray(obj.shrouds)) return false;
        if (!obj.shrouds.every(isShroud)) return false;
    }

    if (obj.jinx !== undefined) {
        if (!Array.isArray(obj.jinx)) return false;
        if (!obj.jinx.every(isJinx)) return false;
    }

    return true;
}
