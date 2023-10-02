import "./approveCancellationRequests.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import ApproveTable from "../../components/approveTable/ApproveTable"
import { user_data } from "../login/Login"
import ApproveCancelTable from "../../components/approveCancelTable/ApproveCancelTable"
import { Navigate } from "react-router-dom"

const ApproveCancellationRequests = () => {
  // render only if logged in and role = authority
  // else go to login or to not authorized page
  const isLogged = localStorage.getItem('isLogged')
  const role = localStorage.getItem('role')
  const isAuthority = ((role === "HOD")||(role==="Administration")||(role=="Authority"))?true:false
  return (
    <div className="approveApp">
    {
      (!isLogged) && <Navigate to="/login" />
    }
    {
      (!isAuthority) && <Navigate to="/" />
    }
        <Sidebar />
        <div className="approveContainer">
            <Navbar />
            <div className="top">
                <h1>APPROVE REQUESTS</h1>
            </div>
            <div className="bottom">
              <ApproveCancelTable />
            </div>
        </div>
    </div>
  )
}

export default ApproveCancellationRequests