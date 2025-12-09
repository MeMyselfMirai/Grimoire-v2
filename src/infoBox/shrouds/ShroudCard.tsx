import { useContext } from "react";
import { GameContext, GameContextType } from "../../data/gameState";
import { RoleData, Shroud } from "../../types/Role"
import { distanceSquared, getToken } from "../../util";
import { GameState } from "../../types/GameState";
import { ActiveShroud, AppState } from "../../data/appState";
import { Visibility } from "../../types/Visibility";


type ShroudCardType = {
    shroud: Shroud;
}

/**
 * Fill out additional properties required for this shroud 
 * (default tokens, some text), based on what shroud was selected.
 * @param shroud The shroud being selected
 * @param appState The state of the app.
 * @param gameState The game state
 * @param roles A list of all known roles.
 * @returns A new shroud object with more details on what should be displayed.
 */
function completeShroud(shroud: Shroud, appState: AppState, gameState: GameState, roles: RoleData): ActiveShroud {
    const newShroud = {...shroud};
    const token = getToken(appState.activeTokenUid, gameState)!;

    if (shroud.cardTitle === "Your Ability Text") {
        newShroud.title += roles[token.id].ability
    }

    const shownIcons: (string | undefined)[] = [];
    if (shroud.cardTitle === "Demon Bluffs") {
        const bluffs = gameState.playerTokens.filter(token => token.visibility === Visibility.Bluff);
        const nearestBluff = token// bluffs.sort((a,b) => distanceSquared(a.position, token.position) - distanceSquared(b.position, token.position))[0];
        bluffs
            .sort((a,b) => distanceSquared(a.position, nearestBluff.position) - distanceSquared(b.position, nearestBluff.position))
            .map(token => token.id)
            .slice(0,3)
            .forEach(id => shownIcons.push(id));
    }

    for (let i = shownIcons.length; i < (shroud.icons ?? 0); i++) {
        let iconId: string | undefined;
        if (shroud.autofill) {
            iconId = token.id;
        }
        shownIcons.push(iconId);
    }

    return {
        ...newShroud,
        shownIcons
    }
}

/**
 * A single shroud card. 
 * @param shroud The shroud this card represents. 
 * @returns 
 */
export default function ShroudCard({ shroud }: ShroudCardType) {
    const { gameState, appState, setAppState, roles } = useContext(GameContext) as GameContextType;

    function showShroud() {
        setAppState(oldState => {
            return {
                ...oldState,
                activeShroud: completeShroud(shroud, appState, gameState, roles),
            }
        });
    }

    return (
        <div
            className="InfoShrouds__card"
            onClick={showShroud}
            style={{ backgroundImage: `url(assets/cards/card-${shroud.cardColor}.png)` }}
        >
            <span className="InfoShrouds__cardTitle">{shroud.cardTitle}</span>
        </div>
    )
}