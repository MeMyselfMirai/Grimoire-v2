import { InfoTabType } from "./InfoBox";

function InfoShrouds({focused, focusCallback}: InfoTabType) {
    return (
        <div className={"InfoShrouds__container InfoBox__tab" + (focused ? " InfoBox__focus" : "")}>
            <div 
                className="InfoBox__tabHeader InfoBox__tabHeaderGeneric" 
                style={{backgroundImage: "url('assets/light_green_swirls.webp')"}}
                onClick={focusCallback}
            >
                <img className="InfoBox__tabImage" src="assets/list.png" alt=""></img>
            </div>
        </div>
    )
}

export default InfoShrouds;