import { createContext } from "react";
import { Shroud } from "../types/Role";
import { NightOrderTab } from "../nightOrder/TopButtons";

/**
 * The current Shroud. Is a Shroud, but includes data on which tokens are in the menu as well.
 */
export type ActiveShroud = Shroud & {
    shownIcons: (string | undefined)[]
}

/**
 * The state of the app. This is NOT persistent. 
 */
export type AppState = {
    /** The UID of the token that is being shown via the Info Box, */
    activeTokenUid: number,

    /** Whether dragging is enabled. */
    draggingEnabled: boolean,

    /** Whether the background selector UI is shown. */
    isBackgroundSelectorOpen: boolean

    /** The Reminder UIDs of any reminders that are presently showing the "prompt deletion" flag. */
    promptedReminders: number[],

    nightOrderData: {
        // TODO: Denest this by one; I initially figured other properties would be relevant.
        currentTab: NightOrderTab
    }

    /** Whether token data is visible (eg: not town square mode) */
    tokenDataVisible: boolean,

    /** The currently active shroud, if any. Null if no shroud is currently being shown. */
    activeShroud?: ActiveShroud,

    /** Data about the dialog */
    dialog?: {
        message: string,
        allowCancel: boolean,
        callback: () => void,
    }

    /** 
     * The callback to run in the mutate menu when any token is selected. 
     * Notably, The Mutate menu is only shown iff there is an action to do. 
     */
    characterSelectCallback?: (id: string) => void
}

/**
 * The default state of the Application on page load. 
 */
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