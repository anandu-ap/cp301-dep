import "./cancelForm.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios"

const CancelForm = () => {

  const isLogged = localStorage.getItem('isLogged')

    const [remarks, setremarks] = useState("");
    const [from_date, setfrom_date] = useState("");
  const role = localStorage.getItem('role')
  const user_id = localStorage.getItem('user_id')
  const leave_id = localStorage.getItem('leave_id')
  const type = localStorage.getItem('remark_type')
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    //
    e.preventDefault();
    const cancel_url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/leave_applications/" + leave_id + "/cancel/remarks" 
    
    axios.post(cancel_url, {
      remarks: remarks,
      from_date: from_date
    }).then((response)=>{
      setremarks("")
    }).catch((error)=>{
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
    })

  navigate("/leavehistory")
  }

  return (
    <div className="cancel">
    {
      (!isLogged) && <Navigate to="/login" />
    }
        <Sidebar />
        <div className="cancelContainer">
            <Navbar />
            <div className="top">
              <h1>CANCELLATION REQUEST REMARKS</h1>
            </div>
            <div className="bottom">
              <div className="bottomContent">
                <form onSubmit={handleSubmit}>
                <div className="formContainer">
                            <label>Enter Remarks : </label><br/>
                            <input type={"text"} value={remarks} placeholder="" onChange={(e) => setremarks(e.target.value)} required/>
                </div>
                <br/>
                <div className="formContainer">
                    <label>From Date :</label>
                    <input type={"date"} value={from_date} onChange={(e) => setfrom_date(e.target.value)} style={{width:100, height:50}} required/>
                </div>
                <button type="submit">SUBMIT</button>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CancelForm