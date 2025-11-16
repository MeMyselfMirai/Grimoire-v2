import { createContext, Dispatch, SetStateAction } from "react";
import { Shroud } from "../types/Role";

export type AppState = {
    activeTokenUid: number,
    activeShroud?: Shroud
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