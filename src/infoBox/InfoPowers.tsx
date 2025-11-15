import { InfoTabType } from "./InfoBox";

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
        </div>
    )
}

export default InfoPowers;