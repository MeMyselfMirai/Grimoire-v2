import { useContext } from "react";
import "./Dialog.css"
import { GameContext, GameContextType } from "../data/gameState";


export default function Dialog() {
    const { appState, setAppState } = useContext(GameContext) as GameContextType;

    if (appState.dialog === undefined) return <></>;

    function ok() {

        appState.dialog?.callback?.();
        setAppState(state => {
            return {
                ...state,
                dialog: undefined
            }
        });
    }

    function cancel() {
        setAppState(state => {
            return {
                ...state,
                dialog: undefined
            }
        });
    }

    let cancelButton = <></>;
    if (appState.dialog.allowCancel) {
        cancelButton = <button className="Dialog__button" onClick={cancel}>Cancel</button>
    }

    return (
        <div className="Dialog__container">
            <div className="Dialog__content" style={{backgroundImage: "url(assets/vines.png)"}}>
                <span className="Dialog__message"> {appState.dialog.message} </span>
                <div className="Dialog__buttons">
                    {cancelButton}
                    <button className="Dialog__button" onClick={ok} >OK</button>
                </div>
            </div>
        </div>
    )
}