import { createContext, Dispatch, SetStateAction } from "react";
import { Shroud } from "../types/Role";

export type ActiveShroud = Shroud & {
    shownIcons: (string | undefined)[]
}

export type AppState = {
    activeTokenUid: number,
    activeShroud?: ActiveShroud
}

export const DEFAULT_APP_STATE: AppState = Object.freeze({
    activeTokenUid: -1,
    activeShroud: undefined
})

export const AppContext = createContext(null);

export type AppContextType = {
    appState: AppState, 
    setAppState: Dispatch<SetStateAction<AppState>>
};