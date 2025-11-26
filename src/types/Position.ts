export type Position = {
    /** How far from the left this item is; its X position. */
    left: number;
    
    /** How far from the top this item is; its Y position.  */
    top: number;
};

export function isPosition(obj: any): obj is Position {
    if (typeof obj !== "object" || obj === null) return false;
    if (typeof obj.left !== "number") return false;
    if (typeof obj.top !== "number") return false;

    return true;
}
