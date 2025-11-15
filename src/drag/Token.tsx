import './Token.css';
import TokenName from "./TokenName";
import { ROLES } from "../data/roleData";

type TokenType = {
    id: string,
    className?: string,
    onClick?: () => void
}

/**
 * A draggable token representing a player in the game. 
 * @param id the Role id to go on this token.
 * @param top how far this token is from the top of the screen, in pixels.
 * @param left how far this token is from the left of the screen, in pixels.
 * @param onDrag a callback to handle this token being dragged around.
 * @param clickCallback a callback to handle this token being clicked. 
 * @param enabled Whether this token should be allowed to be dragged around.
 * @returns 
 */
function Token({ id, className, onClick }: TokenType) {

    const data = ROLES[id];

    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(/assets/token.png)`
            }}
            onClick={() => onClick?.()}
        >
            <img className="Token__image General__backgroundImage" src={data.image} alt={data.name}/>
            <TokenName name={data.name} />
        </div>
    );
}

export default Token;
