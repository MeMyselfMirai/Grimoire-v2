import { useContext, useRef } from "react"
import { GameContext, GameContextType } from "../../data/gameState";


export default function PlayerCount() {
    const { gameState, setGameState } = useContext(GameContext) as GameContextType;

    const inputRef = useRef<any>(null);

    function increment() {
        if (inputRef.current === null) return;
        if (inputRef.current.valueAsNumber === 15) return;
        inputRef.current.valueAsNumber++;
        setGameState(state => {
            return {
                ...state,
                playerCount: inputRef.current.valueAsNumber
            }
        })
    }
    function decrement() {
        if (inputRef.current === null) return;
        if (inputRef.current.valueAsNumber === 5) return;
        inputRef.current.valueAsNumber--;
        setGameState(state => {
            return {
                ...state,
                playerCount: inputRef.current.valueAsNumber
            }
        })
    }

    function onChange() {
        if (inputRef.current === null) return;
        if (Number.isNaN(inputRef.current.valueAsNumber)) {
            inputRef.current.value = "5";
        }
        if (inputRef.current.valueAsNumber > 15) inputRef.current.valueAsNumber = 15;
        if (inputRef.current.valueAsNumber < 5) inputRef.current.valueAsNumber = 5;

        setGameState(state => {
            return {
                ...state,
                playerCount: inputRef.current.valueAsNumber
            }
        })
    }

    return (
        <>
            <span className="PlayerCount__header">Player Count:</span>
            <div className="PlayerCount__container">
                <div 
                    className="General__backgroundImage PlayerCount__button" 
                    style={{backgroundColor: "red", backgroundImage: "url(assets/minus.svg"}}
                    onClick={decrement}
                />
                <input 
                    ref={inputRef}
                    className="PlayerCount__input" 
                    type="number" 
                    inputMode="numeric" 
                    min={5} max={15} 
                    defaultValue={gameState.playerCount}
                    onChange={onChange}
                />
                <div 
                    className="General__backgroundImage PlayerCount__button" 
                    style={{backgroundColor: "lightgreen", backgroundImage: "url(assets/plus.svg)"}}
                    onClick={increment}
                />
            </div>
        </>
    )
}