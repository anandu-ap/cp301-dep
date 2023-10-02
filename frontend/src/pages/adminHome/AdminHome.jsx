import AdminNavbar from "../../components/adminNavbar/AdminNavbar"
import AdminSidebar from "../../components/adminSidebar/AdminSidebar"
import "./adminHome.scss"
import { user_data } from "../login/Login"
import { Navigate } from "react-router-dom"

const AdminHome = () => {
  // check for log in and role = admin
  // if not logged go to login, not admin got to not authorized page
  const isLogged = localStorage.getItem('isLogged')
  const isAdmin = (localStorage.getItem('role')==="Admin")?true:false
  return (
    <div className="adminHome">
    {
      (!isLogged) && <Navigate to="/login" />
    }
    {
      (!isAdmin) && <Navigate to="/" />
    }
        <AdminSidebar />
        <div className="homeContainer">
            <AdminNavbar />
        </div>
    </div>
  )
}

export default AdminHome