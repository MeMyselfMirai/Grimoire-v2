import "./BottomButtons.css"
import ToggleDrag from "./ToggleDrag";
import ToggleVisibility from "./ToggleVisibility";


export default function BottomButtons() {
    return (
        <>
            <ToggleVisibility />
            <ToggleDrag />
        </>
    )
}