import { createContext, Dispatch, SetStateAction } from "react";
import { Shroud } from "../types/Role";
import { NightOrderTab } from "../nightOrder/TopButtons";

export type ActiveShroud = Shroud & {
    shownIcons: (string | undefined)[]
}

export type AppState = {
    activeTokenUid: number,
    draggingEnabled: boolean,
    promptedReminders: number[],
    tokenDataVisible: boolean,
    nightOrderData: {
        // TODO: Denest this by one; I initially figured other properties would be relevant.
        currentTab: NightOrderTab
    }
    activeShroud?: ActiveShroud,
    characterSelectCallback?: (id: string) => void
}

export const DEFAULT_APP_STATE: AppState = Object.freeze({
    activeTokenUid: -1,
    draggingEnabled: true,
    promptedReminders: [],
    tokenDataVisible: true,
    nightOrderData: {
        currentTab: NightOrderTab.None,
        openItems: []
    }
})

export const AppContext = createContext(null);

export type AppContextType = {
    appState: AppState, 
    setAppState: Dispatch<SetStateAction<AppState>>
};