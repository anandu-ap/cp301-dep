import "./adminSidebar.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link } from "react-router-dom";

const AdminSidebar = () => {

  const handleLogout = async(e) => {
    localStorage.clear()
  }
  return (
    <div className="adminSidebar">
      <div className="top">
        <span className="logo">Leave App</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <HomeIcon className="icon" />
            <span><Link to="/admin" className="Link" style={{textDecoration:"none"}}>Admin Home</Link></span>
          </li>
          <p className="title">TASK</p>
          <li>
            <PersonAddIcon className="icon" />
            <span><Link to="/admin/user/add" className="Link" style={{textDecoration:"none"}}>Add User</Link></span>
          </li>
          <li>
            <InsertDriveFileIcon className="icon" />
            <span><Link to="/admin/user/excelsheet" className="Link" style={{textDecoration:"none"}}>Add User through Exel sheet</Link></span>
          </li>
          <li>
            <EditIcon className="icon" />
            <span><Link to="/admin/user/modify" className="Link" style={{textDecoration:"none"}}>Users</Link></span>
          </li>
          <li>
            <PersonRemoveIcon className="icon" />
            <span><Link to="/admin/user/delete" className="Link" style={{textDecoration:"none"}}>Delete User</Link></span>
          </li>
          <p className="title">USER</p>
          <li>
            <LogoutIcon className="icon" />
            <span><Link to="/login" onClick={handleLogout} className="Link" style={{textDecoration:"none"}}>Logout</Link></span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminSidebar