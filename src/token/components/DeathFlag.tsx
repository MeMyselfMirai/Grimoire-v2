import { TokenData } from "../../types/TokenData"
import { Viability } from "../../types/Viability";
import { Visibility } from "../../types/Visibility";

type DeathFlagType = {
    token: TokenData
}

function DeathFlag({token}: DeathFlagType) {
    if (token.viability === Viability.Alive || token.visibility !== Visibility.Assigned) {
        return (<></>)
    }

    if (token.viability === Viability.Dead) {
        return (
            <img className='Token__deathFlag' src="/assets/shroud.png" alt="Dead"></img>
        );
    }

    return (
        <>
            <img className='Token__deathFlag' src="/assets/shroud.png" alt="Dead"></img>
            <img className='Token__deathNoVote' src="/assets/vote.png" alt="Voted"></img>
        </>
    )
}

export default DeathFlag;
