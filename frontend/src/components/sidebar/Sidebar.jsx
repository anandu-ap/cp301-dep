import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskIcon from '@mui/icons-material/Task';
import ListIcon from '@mui/icons-material/List';
import { Link } from "react-router-dom";
import { user_data } from "../../pages/login/Login";

import React from 'react'

const Sidebar = () => {

    // login required
    // if logged in then render
    // else go to login page
    const curr_role = localStorage.getItem('role')
    const isAuthority = ((curr_role === "Authority")||(curr_role === "Administration")||(curr_role === "HOD"))?true:false
    const handleLogout = async(e) => {
        localStorage.clear()
    }
  return (
    <div className="sidebar">
        <div className="top">
            <span className="logo">Leave App</span>
        </div>
        <hr/>
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <li>
                    <DashboardIcon className="icon"/>
                    <span><Link to="/" className="Link" style={{textDecoration:"none"}}>Dashboard</Link></span>
                </li>
                <p className="title">LISTS</p>
                {
                    isAuthority && 
                    <li>
                        <TaskIcon className="icon" />
                        <span><Link to="/approveapplication" className="Link" style={{textDecoration:"none"}}>Approve Requests</Link></span>
                    </li>
                }
                <li>
                    <HistoryIcon className="icon"/>
                    <span><Link to="/leavehistory" className="Link" style={{textDecoration:"none"}}>Leave History</Link></span>
                </li>
                <p className="title">USER</p>
                <li>
                    <PersonOutlineOutlinedIcon className="icon" />
                    <span><Link to="/profile" className="Link" style={{textDecoration:"none"}}>Profile</Link></span>
                </li>
                <li>
                    <LogoutIcon className="icon" />
                    <span><Link to="/login" onClick={handleLogout} className="Link" style={{textDecoration:"none"}}>Logout</Link></span>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar