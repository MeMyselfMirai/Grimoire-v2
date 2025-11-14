import { CSSProperties } from "react";


export function useImage(imagePath: string): CSSProperties {
    return {
        "backgroundImage": `url(${imagePath})`
    }
}

export async function getJSON(path: string) {
    const result = await fetch("/data/" + path);
    return await result.json();
}