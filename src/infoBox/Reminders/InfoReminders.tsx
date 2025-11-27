import { useContext, useEffect, useRef, useState } from "react";
import { AppContextType } from "../../data/appState";
import { GameContext, GameContextType } from "../../data/gameState";
import { InfoTabType } from "../InfoBox";
import { getToken } from "../../util";
import { ROLES } from "../../data/roleData";
import SampleReminder from "../../reminder/SampleReminder";
import ReminderSpawner from "../../reminder/ReminderSpawner";

type GhostProp = {
    left: number,
    top: number,
    text: string,
}

function InfoReminders({focused, focusCallback}: InfoTabType) {
    const {gameState, appState} = useContext(GameContext) as AppContextType & GameContextType;

    const landingRef = useRef<HTMLDivElement>(null)
    const [ghosts, setGhosts] = useState<GhostProp[]>([])

    const roleId = getToken(appState.activeTokenUid, gameState)!.id;

    const role = ROLES[roleId];


    useEffect(() => {
        if (!landingRef.current) return;
        if (role.reminders === undefined) return;

        const landingRect = landingRef.current.getBoundingClientRect();

        const newGhosts = role.reminders!.map((reminderText, index) => {
        
            const child = landingRef.current!.children[index] as HTMLElement;
            const rect = child.getBoundingClientRect();
            const left = rect.x - landingRect.x;
            const top = rect.y - landingRect.y;

            return {left: left, top: top, text: reminderText};
        })

        setGhosts(newGhosts);
    }, [role.reminders]);


    let staticJsx = [];
    let draggableJsx = ghosts.map(({left, top, text}, index) => {
        return <ReminderSpawner 
            key={index} 
            text={text} 
            ownerUid={appState.activeTokenUid}
            className="InfoReminders__dynamicReminder"
            left={left} 
            top={top} 
            roleId={role.id} 
        />
    });

    if (role.reminders !== undefined) {
        for (const reminderText of role.reminders!) {
            staticJsx.push(<SampleReminder 
                id={roleId}
                text={reminderText}
                className="InfoReminders__staticReminder"
            />);
        }
    }


    return (
        <div className={"InfoReminders__container InfoBox__tab" + (focused ? " InfoBox__focus" : "")}>
            <div 
                className="InfoBox__tabHeader InfoBox__tabHeaderGeneric" 
                style={{backgroundImage: "url('assets/blue_swirls.webp')"}}
                onClick={focusCallback}
            >
                <img className="InfoBox__tabImage" src="assets/reminders.png" alt=""></img>
            </div>
            <div ref={landingRef} className="InfoReminders__content">
                {staticJsx}
            </div>
            <div className="InfoReminders__content">
                {draggableJsx}
            </div>
        </div>
    )
}

export default InfoReminders;