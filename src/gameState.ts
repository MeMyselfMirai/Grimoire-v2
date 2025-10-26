import { Position } from "./types/Position";

const multipleTokens: Position[] = JSON.parse(localStorage.getItem("positions") ?? "[]") as Position[];
if (multipleTokens.length === 0) {
    for (let i = 0; i < 9; i++) {
        multipleTokens.push({ top: Math.random() * 400, left: Math.random() * 800})
    }
    localStorage.setItem("positions", JSON.stringify(multipleTokens));
}

export { multipleTokens };