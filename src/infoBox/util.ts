import { GameState } from "../types/GameState";
import { TokenData } from "../types/TokenData";

export type InfoTabType = {
    focused: boolean,
    focusCallback: () => void
}

export function getToken(uid: number, gameState: GameState): TokenData | undefined {
    for (const token of gameState.playerTokens) {
        if (token.uid === uid) return token;
    }
    return undefined;
}