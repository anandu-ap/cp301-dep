import { Navigate } from "react-router-dom"
import AdminNavbar from "../../components/adminNavbar/AdminNavbar"
import AdminSidebar from "../../components/adminSidebar/AdminSidebar"
import UserList from "../../components/userList/UserList"
import "./deleteUser.scss"

const DeleteUser = () => {
  const isLogged = localStorage.getItem('isLogged')
  const role = localStorage.getItem('role')
  const isAdmin = (role === "Admin")?true:false
  return (
    <div className="deleteUser">{
      (!isLogged) && <Navigate to="/login" />
    }
    {
      (!isAdmin) && <Navigate to="/" />
    }
      <AdminSidebar />
      <div className="deleteContainer">
        <AdminNavbar />
        <div className="top">
          <h1>Remove Users</h1>
        </div>
        <div className="bottom">
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default DeleteUser