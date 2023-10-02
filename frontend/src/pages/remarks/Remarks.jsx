import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./remarks.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Remarks = () => {

  const [remarks, setremarks] = useState("");
  const role = localStorage.getItem('role')
  const user_id = localStorage.getItem('user_id')
  const leave_id = localStorage.getItem('leave_id')
  const type = localStorage.getItem('remark_type')
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    //
    e.preventDefault();
    const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/" + type +  " requests/" + leave_id + "/remarks"
    
    axios.post(url, {
      remarks: remarks
    }).then((response)=>{
      setremarks("")
    }).catch((error)=>{
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
    })

  navigate("/approveapplication")
  }

  return (
    <div className="remarks">
        <Sidebar />
        <div className="remarksContainer">
            <Navbar />
            <div className="top">
              <h1>REMARKS</h1>
            </div>
            <div className="bottom">
              <div className="bottomContent">
                <form onSubmit={handleSubmit}>
                <div className="formContainer">
                            <label>Enter Remarks : </label><br/>
                            <input type={"text"} value={remarks} placeholder="" onChange={(e) => setremarks(e.target.value)} required/>
                </div>
                <button type="submit">SUBMIT</button>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Remarks