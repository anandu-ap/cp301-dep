import "./widget.scss"
import { Link } from "react-router-dom";

const Widget = ({type}) => {
    let data;
    //temporary
    const amount = 100;
    const diff = 20;

    switch (type) {
        case "casual":
            data={
                button: "CASUAL",
                link:"/new/casual",
            }
            break;
        case "noncasual":
            data={
                button: "NON-CASUAL",
                link:"/new/noncasual",
            }
            break;   
        default:
            break;
    }

    return (
    <div className="widget">
        <div className="left">
            <span className="title">CREATE NEW :</span>
            <div className="widgetButton"><Link to={data.link} className="Link" style={{textDecoration:"none"}}>{data.button}</Link></div>
        </div>
    </div>
    )
}

export default Widget