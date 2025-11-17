import { GameState } from "./types/GameState";
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