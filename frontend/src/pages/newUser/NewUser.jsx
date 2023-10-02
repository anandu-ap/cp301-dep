import AdminNavbar from "../../components/adminNavbar/AdminNavbar"
import AdminSidebar from "../../components/adminSidebar/AdminSidebar"
import "./newUser.scss"
import {useState} from "react"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import { user_data } from "../login/Login"
import { useAuth } from "../../auth"

// username=request_data["username"
// email_address=request_data["email"],
// name=request_data["name"],
// faculty_staff = request_data["faculty_staff"],
// department=request_data["department"],
// designation=request_data["designation"],
// password='iitrpr',
// isfirst=1)
// Role Admin, Administration Authority, HOD, Applicant

// get the current user from props


const NewUser = () => {

    // check for log in and role = Admin
    // then render
    const isLogged = localStorage.getItem("isLogged")
    const isAdmin = (localStorage.getItem('role')==="Admin")?true : false

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [faculty_staff, setfaculty_staff] = useState("");
    const [department, setdepartment] = useState("");
    const [designation, setdesignation] = useState("");
    const [role, setrole] = useState("");

    const navigate = useNavigate()

    let handleSubmit = async(e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:5000/Admin/dashboard/adduser", {
            username: username,
            email: email,
            name: name,
            faculty_staff: faculty_staff,
            department: department,
            designation: designation,
            role: role,
            isfirst: 1,
            password: "iitrpr"
        })
        .then((response) => {
            // clear all the values
            if(response.status == 200){
                setusername("")
                setemail("")
                setname("")
                setfaculty_staff("")
                setdepartment("")
                setdesignation("")
                setrole("")

                // redirect to edit user list
                navigate("/admin/user/modify")
            }
        }).catch((error) => {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        })
    }

  return (
    <div className="newUser">{
        (!isLogged) && <Navigate to="/login" />
    }
    {
        (!isAdmin) && <Navigate to="/" />
    }
        <AdminSidebar />
        <div className="newContainer">
            <AdminNavbar />
            <div className="top">
                <h1>Add New User</h1>
            </div>
            <div className="bottom">
                <div className="bottomContent">
                    <form onSubmit={handleSubmit}>
                        <div className="formContainer">
                            <label>Username<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={username} 
                                placeholder="Username" 
                                onChange={(e) => setusername(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Email<sup>*</sup></label>
                            <input 
                                type={"email"} 
                                value={email} 
                                placeholder="Email" 
                                onChange={(e) => setemail(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Name<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={name} 
                                placeholder="Name" 
                                onChange={(e) => setname(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Faculty/Staff<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={faculty_staff} 
                                placeholder="" 
                                onChange={(e) => setfaculty_staff(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Department<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={department} 
                                placeholder="Department" 
                                onChange={(e) => setdepartment(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Designation<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={designation} 
                                placeholder="Designation" 
                                onChange={(e) => setdesignation(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Role<sup>*</sup></label>
                            <div className="formButton" onChange={(e) => setrole(e.target.value)}>
                                <input className="icon" type="radio" name="role" value="Admin"/ >
                                <label>Admin</label>
                                <input className="icon" type="radio" name="role" value="Administration"/>
                                <label>Administration</label>
                                <input className="icon" type="radio" name="role" value="Authority"/>
                                <label>Authority</label>
                                <input className="icon" type="radio" name="role" value="HOD"/>
                                <label>HOD</label>
                                <input className="icon" type="radio" name="role" value="Applicant"/>
                                <label>Applicant</label>
                            </div>
                        </div>
                        <button type="submit">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewUser