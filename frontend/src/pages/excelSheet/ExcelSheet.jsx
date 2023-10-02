import "./excelSheet.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AdminSidebar from "../../components/adminSidebar/AdminSidebar"
import AdminNavbar from "../../components/adminNavbar/AdminNavbar"

const ExcelSheet = () => {

    const [selectedFile, setselectedFile] = useState();
    const [isFilePicked, setisFilePicked] = useState(false);
    const user_id = localStorage.getItem('user_id')
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setselectedFile(e.target.files[0])
        setisFilePicked(true)
    }
    
    const handleSubmission = (e) => {
        const formData = new FormData();
        formData.append('File', selectedFile)
        const url = "http://127.0.0.1:5000/Admin/" + user_id + "/dashboard/adduser_by_excel"

        fetch(url, {
            method: "POST",
            body: formData
        }).then((response) => response.json())
        .then((result) => {
            console.log("success")
            navigate("/admin/user/delete")
        })
    }

    // const handleSubmit = async(e) => {
    //     e.preventDefault()
    //     const url = "http://127.0.0.1:5000/Admin/" + user_id + "/dashboard/adduser_by_excel"

    //     axios.post(url, {
    //         filename: up_file
    //       }).then((response)=>{
    //         setup_file("")
    //         navigate("/admin/user/delete")
    //       }).catch((error)=>{
    //         console.log(error.response)
    //         console.log(error.response.status)
    //         console.log(error.response.headers)
    //       })
    // }

  return (
    <div className="remarks">
        <AdminSidebar />
        <div className="remarksContainer">
            <AdminNavbar />
            <div className="top">
              <h1>Upload Excel Sheet : </h1>
            </div>
            <div className="bottom">
              <div className="bottomContent">
                <form onSubmit={handleSubmission}>
                <div className="formContainer">
                            <label>File : </label><br/>
                            <input type={"file"} name="file" onChange={changeHandler} required/>
                </div>
                <button type="submit">SUBMIT</button>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ExcelSheet