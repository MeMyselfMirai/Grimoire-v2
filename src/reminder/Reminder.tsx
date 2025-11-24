import "./Reminder.css"
import { ReminderData } from "../types/Reminder"
import { ROLES } from "../data/roleData"
import { RefObject, useRef } from "react"


type ReminderType = {
    reminder: ReminderData,
    promptDeletion: boolean,
    className?: string,
}

export default function Reminder({reminder, className, promptDeletion}: ReminderType) {

    // Kludge to fix a reference error in Draggable 4.5.
    // https://github.com/react-grid-layout/react-draggable/issues/771#issuecomment-2545737391
    const ref: RefObject<any> = useRef(null);
    const role = ROLES[reminder.id];

    const classes = className === undefined ? "General__backgroundImage" : className + " General__backgroundImage"

    let prompt = <></>;
    if (promptDeletion) {
        prompt = <img className="Reminder__prompt" src="/assets/delete.png" alt="Deletion prompt" />;
    }

    return (
        <div ref={ref} className={classes} style={{backgroundImage: "url(assets/reminder.png"}}>
            <img className="Reminder__image" src={role.image} alt={role.name}/>
            <p className="Reminder__text">{reminder.text}</p>
            {prompt}
        </div>
    )
}