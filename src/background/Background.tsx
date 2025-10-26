import "./Background.css"

function Background({image}: any) {
    return (
        <div className="Background__image" style={{backgroundImage: image}}></div>
    )
}

export default Background;
