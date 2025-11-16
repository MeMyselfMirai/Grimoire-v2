
export type RoleData = {
    [key: string]: Role
}

export type Role = {
    id: string,
    name: string,
    ability: string,
    flavor?: string,
    team: string,
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

export type Jinx = {
    id: string,
    reason: string
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