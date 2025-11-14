import { createContext, Dispatch, SetStateAction } from "react";

export type AppState = {
    activeTokenUid: number
}

export const DEFAULT_APP_STATE: AppState = Object.freeze({
    activeTokenUid: -1
})

export const AppContext = createContext(null);

export type AppContextType = {
    appState: AppState, 
    setAppState: Dispatch<SetStateAction<AppState>>
};