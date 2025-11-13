import { Position } from "../types/Position";

export type TokData = Position & {id: string}

const initialTokens: TokData[] = JSON.parse(localStorage.getItem("positions") ?? "[]") as TokData[];
if (initialTokens.length === 0 || initialTokens[0].id == undefined) {
    initialTokens.length = 0;
    for (let i = 0; i < 9; i++) {
        initialTokens.push({ top: Math.random() * 400, left: Math.random() * 80, id: "alsaahir"})
    }
    localStorage.setItem("positions", JSON.stringify(initialTokens));
}

export { initialTokens as multipleTokens };