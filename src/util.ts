import { GameState } from "./types/GameState";
import { Reminder } from "./types/Reminder";
import { TokenData } from "./types/TokenData";

export async function getJSON(path: string) {
    const result = await fetch("/data/" + path);
    return await result.json();
}

export function getToken(uid: number, gameState: GameState): TokenData | undefined {
    for (const token of gameState.playerTokens) {
        if (token.uid === uid) return token;
    }
    return undefined;
}

export function getReminder(uid: number, gameState: GameState): Reminder | undefined {
    for (const reminder of gameState.reminders) {
        if (reminder.reminderUid === uid) return reminder;
    }
    return undefined;
}

export function getAllTokenReminders(tokenUid: number, gameState: GameState): Reminder[] {
    return gameState.reminders.filter(reminder => reminder.ownerUid === tokenUid);
}