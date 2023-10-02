import AdminNavbar from "../../components/adminNavbar/AdminNavbar"
import AdminSidebar from "../../components/adminSidebar/AdminSidebar"
import UserList from "../../components/userList/UserList"
import "./modifyUser.scss"

const ModifyUser = () => {
  const isAdmin = ((localStorage.getItem('isLogged'))&&(localStorage.getItem('role')==="Admin"))?true : false
  return (
    <div className="modifyUser">
      <AdminSidebar />
      <div className="modifyContainer">
        <AdminNavbar />
        <div className="top">
          <h1>Edit Users</h1>
        </div>
        <div className="bottom">
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default ModifyUser