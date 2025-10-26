import { CSSProperties } from "react";


export function useImage(imagePath: string): CSSProperties {
    return {
        "backgroundImage": `url(${imagePath})`
    }
}