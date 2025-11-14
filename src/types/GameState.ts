import { Reminder } from "./Reminder"
import { Script } from "./Script"
import { TokenData } from "./TokenData"


export type GameState = {
    background: string,
    isNight: boolean,
    orientation: "portrait" | "landscape",
    playerCount: number,
    playerTokens: TokenData[],
    reminders: Reminder[],
    script: Script
    scriptColor: string,
    scriptId: number
}