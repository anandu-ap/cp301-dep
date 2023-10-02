import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import PersonIcon from '@mui/icons-material/Person';
import "./profile.scss"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { user_data } from "../login/Login";
import {Navigate} from "react-router-dom"

const Profile = () => {

    // log in required else navigate to log in
    const isLogged = localStorage.getItem('isLogged')

    // get user id from props
    // const data = {
    //     name: "Test User",
    //     department: "Test Department",
    //     designation: "Test Designation",
    //     email: "test@iitrpr.ac.in",
    //     contact: 1234567890,
    // }

    const [data, setdata] = useState(
        {
            name: "",
            department: "",
            designation: "",
            email: "",
            role: ""
        }
    )

    const role = localStorage.getItem("role")
    const user_id = localStorage.getItem("user_id")
    const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/profile"

    useEffect(() => {
        fetch(url).then((data) => data.json())
        .then((data)=> setdata({
            name: data.name,
            department: data.department,
            designation: data.designation,
            email: data.email,
            role: data.role
        }))
      }, [])

  return (
    <div className="profile">{
        (!isLogged)&&<Navigate to="/login" />
    }
        <Sidebar/>
        <div className="profileContainer">
            <Navbar />
            <div className="top">
                <div className="left">
                    <h1 className="title">Information</h1>
                    <div className="item">
                        <PersonIcon className="itemImg"/>
                        <div className="details">
                            <h1 className="itemTitle">{data.name}</h1>
                            <div className="detailItem">
                                <span className="itemKey">Department:</span>
                                <span className="itemValue">{data.department}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Designation:</span>
                                <span className="itemValue">{data.designation}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Email:</span>
                                <span className="itemValue">{data.email}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Role:</span>
                                <span className="itemValue">{data.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right"></div>
            </div>
        </div>
    </div>
  )
}

export default Profile