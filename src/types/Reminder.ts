import { Position } from "./Position"


export type Reminder = {
    // The role that is on this reminder
    id: string,
    text: string,
    ownerUid: number,
    reminderUid: number
} & Position