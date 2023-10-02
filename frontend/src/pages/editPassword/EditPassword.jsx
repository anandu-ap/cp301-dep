import axios from "axios";
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import "./editPassword.scss"

const EditPassword = () => {

    const [new_password, setnew_password] = useState("")
    const [re_new_password, setre_new_password] = useState("");
    const [email_token, setemail_token] = useState("");

    const isLogged = localStorage.getItem("isLogged")
    const local_token = localStorage.getItem("local_token")
    const reset_user_id = localStorage.getItem("reset_user_id")

    const navigate = useNavigate()

    let handleSubmit = async(e) => {
        const url = "http://127.0.0.1:5000/reset_password/" + reset_user_id
        axios.post(url, {
            password1: new_password,
            password2: re_new_password,
            token1 : email_token,
            token2: local_token,
        })
        .then((response) => {
            if (response.status==200) {
                //navigate to login
                
            }
        }).catch((error) => {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        })

        navigate("/login")
    }

  return (
    <div className='editPassword'>{
        isLogged && <Navigate to= "/" />
    }
        <div className="form">
            <div className="edit">
                <div className="login-header">
                    <h3>EDIT PASSWORD</h3>
                    <p>Please enter the new Password</p>
                </div>
            </div>
            <form className="edit-form" onSubmit={handleSubmit}>
                <input type={"text"} value={email_token} placeholder="Copy Token from Email" onChange={(e) => setemail_token(e.target.value)} required/> 
                <input type={"text"} value={new_password} placeholder="Enter New Password" onChange={(e) => setnew_password(e.target.value)} required/>
                <input type={"text"} value={re_new_password} placeholder="Re-Enter New Password" onChange={(e) => setre_new_password(e.target.value)} required/>
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    </div>
  )
}

export default EditPassword