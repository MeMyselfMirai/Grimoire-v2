import TextareaAutosize from 'react-textarea-autosize';


type ShroudTitleType = {
    title: string
}

export default function ShroudTitle({ title }: ShroudTitleType) {

    return (
        <TextareaAutosize className="Shroud__title" placeholder='You Learn...'>{title}</TextareaAutosize>
    );
}