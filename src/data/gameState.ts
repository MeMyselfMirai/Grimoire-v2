import { createContext, Dispatch, SetStateAction } from "react";
import { GameState } from "../types/GameState";
import { Position } from "../types/Position";

export type TokData = Position & {id: string}

const initialTokens: TokData[] = JSON.parse(localStorage.getItem("positions") ?? "[]") as TokData[];
if (initialTokens.length === 0 || initialTokens[0].id === undefined) {
    initialTokens.length = 0;
    for (let i = 0; i < 9; i++) {
        initialTokens.push({ top: Math.random() * 400, left: Math.random() * 80, id: "alsaahir"})
    }
    localStorage.setItem("positions", JSON.stringify(initialTokens));
}


export function load(): GameState {
    if (localStorage.getItem("state") == null) {
        return {
            background: "",
            isNight: false,
            orientation: "landscape",
            playerCount: 12,
            playerTokens: [],
            reminders: [],
            script: [
                {
                    id: "_meta",
                    author: "TPI Official",
                    name: "Test Game Script"
                }
            ],
            scriptColor: "blue",
            scriptId: 0
        }
    }
    return JSON.parse(localStorage.getItem("state")!) as GameState;
}

export function save(state: GameState) {
    localStorage.setItem("state", JSON.stringify(state));
}


export const GameContext = createContext<any>(null);

export type ContextType = {gameState: GameState, setGameState: Dispatch<SetStateAction<GameState>>};


export { initialTokens as multipleTokens };