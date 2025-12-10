import { GameState } from "./types/GameState";
import { Position } from "./types/Position";
import { ReminderData } from "./types/Reminder";
import { TokenData } from "./types/TokenData";

export async function getJSON(path: string) {
    const result = await fetch("/data/" + path + "?antiCache=" + Date.now());
    return await result.json();
}

export function getToken(uid: number, gameState: GameState): TokenData | undefined {
    for (const token of gameState.playerTokens) {
        if (token.uid === uid) return token;
    }
    return undefined;
}

export function getReminder(uid: number, gameState: GameState): ReminderData | undefined {
    for (const reminder of gameState.reminders) {
        if (reminder.reminderUid === uid) return reminder;
    }
    return undefined;
}

export function getAllTokenReminders(tokenUid: number, gameState: GameState): ReminderData[] {
    return gameState.reminders.filter(reminder => reminder.ownerUid === tokenUid);
}

export function distanceSquared(pos1: Position, pos2: Position): number {
    return (pos1.left - pos2.left) ** 2 + (pos1.top - pos2.top) ** 2;
}
