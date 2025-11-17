import { InfoTabType } from "../InfoBox";
import SetName from "./SetName";
import DeleteButton from "./DeleteButton";
import ViabilityButton from "./ViabilityButton";
import VisibilityButton from "./VisibilityButton";
import EditButton from "./EditButton";

function InfoPowers({focused, focusCallback}: InfoTabType) {

    return (
        <div className={"InfoPowers__container InfoBox__tab" + (focused ? " InfoBox__focus" : "")}>
            <div 
                className="InfoBox__tabHeader InfoBox__tabHeaderGeneric" 
                style={{backgroundImage: "url('assets/yellow_swirls.webp')"}}
                onClick={focusCallback}
            >
                <img className="InfoBox__tabImage" src="assets/power.png" alt=""></img>
            </div>
            <div className="InfoPowers__content">
                <SetName></SetName>
                <div className="InfoPowers__optionsContainer">
                    <DeleteButton></DeleteButton>
                    <ViabilityButton></ViabilityButton>
                    <VisibilityButton></VisibilityButton>
                    <EditButton></EditButton>
                </div>
            </div>
        </div>
    )
}

export default InfoPowers;