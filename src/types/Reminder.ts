import { Position } from "./Position"


export type Reminder = {
    // The role that is on this reminder
    id: string,
    text: string,
    owner_uid: number,
    reminder_uid: number
} & Position