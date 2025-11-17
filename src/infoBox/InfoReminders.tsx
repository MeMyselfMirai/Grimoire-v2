import { InfoTabType } from "./InfoBox";

function InfoReminders({focused, focusCallback}: InfoTabType) {
    return (
        <div className={"InfoReminders__container InfoBox__tab" + (focused ? " InfoBox__focus" : "")}>
            <div 
                className="InfoBox__tabHeader InfoBox__tabHeaderGeneric" 
                style={{backgroundImage: "url('assets/blue_swirls.webp')"}}
                onClick={focusCallback}
            >
                <img className="InfoBox__tabImage" src="assets/reminders.png" alt=""></img>
            </div>
        </div>
    )
}

export default InfoReminders;