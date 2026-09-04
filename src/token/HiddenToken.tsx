import { useContext } from "react"
import { Team } from "../types/Team"
import { TokenData } from "../types/TokenData"
import { Viability } from "../types/Viability"
import { Visibility } from "../types/Visibility"
import { GameContext, GameContextType } from "../data/gameState"
import { getImage } from "../types/Role"

type HiddenTokenType = {
    token: TokenData
    className?: string
}

export default function HiddenToken({ token, className }: HiddenTokenType) {

    const { roles } = useContext(GameContext) as GameContextType;

    const role = roles[token.id];

    if (token.visibility !== Visibility.Assigned) return <></>
    
    let image = "url('/assets/icons/townSquareAlive.png')"
    if (token.viability !== Viability.Alive) image = "url('/assets/icons/townSquareDead.png')"

    let deadvoteJsx = <></>;
    if (token.viability === Viability.Dead) {
        deadvoteJsx = <img src="/assets/icons/townSquareVote.png" className="General__backgroundImage HiddenToken__deadvote" alt="" />
    }

    let travellerIndicatorJsx = <></>
    if (role?.team === Team.Traveller) {
        // TODO: Images could be arrays of strings.
        travellerIndicatorJsx = <img src={getImage(role)} className="General__backgroundImage HiddenToken__roleIndicator" alt={role.name} />
    }

    return (
        <div className={className} style={{backgroundImage: image}}>
            {deadvoteJsx}
            {travellerIndicatorJsx}
            <span className='Token__name'>{token.visibility === Visibility.Assigned ? token.name ?? "" : ""}</span>
        </div>
    )
}