import "./Background.css"

function Background({image}: any) {
    return (
        <div className="backgroundImage" style={{backgroundImage: image}}></div>
    )
}

export default Background;
