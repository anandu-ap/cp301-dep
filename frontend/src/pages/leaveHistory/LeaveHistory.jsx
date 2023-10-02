import { Navigate } from "react-router-dom"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./leaveHistory.scss"

const LeaveHistory = (props) => {
  const isLoggedIn = localStorage.getItem("isLogged")
  return (
    <div className="leavehistory">
    {
      (!isLoggedIn) && <Navigate to="/login" />
    }
        <Sidebar />
        <div className="leaveContainer">
            <Navbar />
            <div className="top">
                <h1>APPLICATION HISTORY</h1>
            </div>
            <div className="bottom">
                <Datatable />
            </div>
        </div>
    </div>
  )
}

export default LeaveHistory