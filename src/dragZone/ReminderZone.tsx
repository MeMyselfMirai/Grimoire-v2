import { useContext } from "react";
import { DraggableEvent, DraggableData } from "react-draggable";
import { AppContextType } from "../data/appState";
import { GameContext, GameContextType } from "../data/gameState";
import { GameState } from "../types/GameState";
import DraggableReminder from "../reminder/DraggableReminder";


export default function ReminderZone() {

    const { gameState, setGameState, appState, setAppState } = useContext(GameContext) as GameContextType & AppContextType;

    function handleDrag(_: DraggableEvent, ui: DraggableData, index: number) {
        setGameState(oldState => {
            return {
                ...oldState,
                reminders: [
                    ...oldState.reminders.slice(0, index),
                    {
                        ...oldState.reminders[index],
                        top: oldState.reminders[index].top + ui.deltaY,
                        left: oldState.reminders[index].left + ui.deltaX,
                    },
                    ...oldState.reminders.slice(index + 1)
                ]
            }
        });
    }

    function handleClick(e: any, index: number) {
        if (!appState.tokenDataVisible) return;

        const reminder = gameState.reminders[index];
        console.log(reminder.reminderUid)
        e.stopPropagation();

        if (appState.promptedReminders.indexOf(reminder.reminderUid) === -1) {
            setAppState(oldState => {
                return {
                    ...oldState,
                    promptedReminders: [
                        ...oldState.promptedReminders,
                        reminder.reminderUid
                    ]
                }
            })
            return;
        }

        setGameState(oldState => {
            return {
                ...oldState,
                reminders: [
                    ...oldState.reminders.slice(0, index),
                    ...oldState.reminders.slice(index + 1)
                ]
            }
        });
        setAppState(oldState => {
            return {
                ...oldState,
                promptedReminders: oldState.promptedReminders.filter(x => x !== reminder.reminderUid),
            }
        })
    }

    function handleDrop(index: number) {
        setGameState(oldState => {
            const newState: GameState = { ...oldState };
            const oldReminder = oldState.reminders[index];
            newState.reminders = [
                ...oldState.reminders.slice(0, index),
                ...oldState.reminders.slice(index + 1),
                oldReminder
            ];
            return newState;
        });
    }

    console.log(appState.promptedReminders)

    const reminders = gameState.reminders.map((reminder, index) => (
        <DraggableReminder 
            key={reminder.reminderUid}
            dragEnabled={appState.draggingEnabled}
            reminder={reminder} 
            promptDeletion={appState.promptedReminders.indexOf(reminder.reminderUid) !== -1}
            onDrag={(e,ui) => handleDrag(e, ui, index)}
            onDrop={() => handleDrop(index)}
            onClick={(e) => handleClick(e, index)}
        />
    ));

    return (
        <div className="DragZone__container">
            {reminders}
        </div>
    )
}