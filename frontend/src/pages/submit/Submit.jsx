import { Link } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./submit.scss"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CheckIcon from '@mui/icons-material/Check';

const Submit = () => {
  return (
    <div className="submit">
        <Sidebar />
        <div className="submitContainer">
            <Navbar name="Test" />
            <div className="top">
                <h3>Application Submitted <CheckIcon className="check"/></h3>
                <Link to="/" className="Link" style={{textDecoration:"none"}}>Return to Dashboard <KeyboardReturnIcon/></Link>
            </div>
        </div>
    </div>
  )
}

export default Submit