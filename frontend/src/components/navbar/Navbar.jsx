import "./navbar.scss"
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { user_data } from "../../pages/login/Login";
import { Link } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";


const Navbar = () => {
  // if logged in then render
  // else go to login

  const [days, setdays] = useState(30)
  const [name, setname] = useState("")

  const user_id = localStorage.getItem("user_id")

  const url = "http://127.0.0.1:5000/remaining_leaves/" + user_id
  useEffect(() => {
    fetch(url).then((data) => data.json())
    .then((data)=> {
      setdays(data.remaining_leaves)
      setname(data.name)
    })
  }, [])

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <NotificationsIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <PersonIcon className="icon" />
            <span className="itemText">{name}</span>
          </div>
          <div className="item">
            <span className="itemText">Leaves Left : {days}</span>
          </div>
          <div className="item">
            <LogoutIcon className="icon" />
            <span className="itemText"><Link to="/logout" style={{textDecoration:"none"}}>Logout</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar