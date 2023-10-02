import AdminNavbar from "../../components/adminNavbar/AdminNavbar"
import AdminSidebar from "../../components/adminSidebar/AdminSidebar"
import "./editSingle.scss"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { RepeatOneSharp } from "@mui/icons-material"
import { target_user } from "../../components/userList/UserList"

const EditSingle = () => {
    // logged in and role = admin
    const isLogged = localStorage.getItem('isLogged')
  const checkrole = localStorage.getItem('role')
  const isAdmin = (checkrole === "Admin")?true:false

    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [faculty_staff, setfaculty_staff] = useState("");
    const [department, setdepartment] = useState("");
    const [designation, setdesignation] = useState("");
    const [role, setrole] = useState("");

    const navigate = useNavigate()

    // useEffect(
    //     axios.get("").then((response) => {
    //         const data = response.data
    //         if(response.status === 200){
    //             setusername(data.username)
    //             setemail(data.email)
    //             setname(data.name)
    //             setfaculty_staff(data.faculty_staff)
    //             setdepartment(data.department)
    //             setdesignation(data.designation)
    //         }
    //     }).catch((error) => {
    //         console.log(error.response)
    //         console.log(error.response.status)
    //         console.log(error.response.headers)
    //     })
    // )

    let handleSubmit = async(e) => {
        e.preventDefault();
        axios.post("", {
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
    <div className="editSingle">
    {
        (!isLogged) && <Navigate to="/login" />
    }
    {
        (!isAdmin) && <Navigate to="/" />
    }
        <AdminSidebar />
        <div className="newContainer">
            <AdminNavbar />
            <div className="top">
                <h1>Edit User</h1>
            </div>
            <div className="bottom">
                <div className="bottomContent">
                    <form onSubmit={handleSubmit}>
                        <div className="formContainer">
                            <label>Username<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={username} 
                                placeholder={username} 
                                onChange={(e) => setusername(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Email<sup>*</sup></label>
                            <input 
                                type={"email"} 
                                value={email} 
                                placeholder={email} 
                                onChange={(e) => setemail(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Name<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={name} 
                                placeholder={name} 
                                onChange={(e) => setname(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Faculty_staff<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={faculty_staff} 
                                placeholder={faculty_staff} 
                                onChange={(e) => setfaculty_staff(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Department<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={department} 
                                placeholder={department}
                                onChange={(e) => setdepartment(e.target.value)}
                                required/>
                        </div>
                        <div className="formContainer">
                            <label>Designation<sup>*</sup></label>
                            <input 
                                type="text" 
                                value={designation} 
                                placeholder={designation} 
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

export default EditSingle