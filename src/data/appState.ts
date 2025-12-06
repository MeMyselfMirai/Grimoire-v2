import { createContext } from "react";
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
    isBackgroundSelectorOpen: boolean
    characterSelectCallback?: (id: string) => void
}

export const DEFAULT_APP_STATE: AppState = Object.freeze({
    activeTokenUid: -1,
    draggingEnabled: true,
    isBackgroundSelectorOpen: false,
    promptedReminders: [],
    tokenDataVisible: true,
    nightOrderData: {
        currentTab: NightOrderTab.None,
        openItems: []
    }
})

export const AppContext = createContext(null);