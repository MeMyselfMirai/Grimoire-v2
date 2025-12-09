import './Token.css';
import TokenName from "./components/TokenName";
import { TokenData } from '../types/TokenData';
import DeathFlag from './components/DeathFlag';
import { Visibility } from '../types/Visibility';
import Shading from './components/Shading';
import VisibilityIndicator from './components/VisibilityIndicator';
import { useContext } from 'react';
import { GameContext, GameContextType } from '../data/gameState';
import { getImage } from '../types/Role';

type TokenType = {
    token: TokenData
    focused?: boolean
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
function Token({ token, focused = false, className, onClick }: TokenType) {

    const { roles } = useContext(GameContext) as GameContextType;

    const data = roles[token.id];
    
    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(/assets/token.png)`,
            }}
            onClick={() => onClick?.()}
        >
            <img className="Token__image General__backgroundImage" src={getImage(data)} alt={data.name}/>
            <Shading token={token} focused={focused} className={className}></Shading>
            <TokenName name={data.name} />
            <DeathFlag token={token} />
            <VisibilityIndicator token={token}></VisibilityIndicator>
            <span className='Token__name'>{token.visibility === Visibility.Assigned ? token.name ?? "" : ""}</span>
        </div>
    );
}

export default Token;
