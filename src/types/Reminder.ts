import { Position } from "./Position"


export type ReminderData = {
    // The role that is on this reminder
    id: string,
    text: string,
    ownerUid: number,
    reminderUid: number
} & Position