import axios from "axios"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import "./forgotPassword.scss"
import { useNavigate } from "react-router-dom"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'

const ForgotPassword = () => {

    const isLogged = localStorage.getItem("isLogged")
    const navigate = useNavigate()

    const [email, setemail] = useState("")
    const [showMessage, setshowMessage] = useState(false);
    const [alertMessage, setalertMessage] = useState("");

    let handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/reset_password",{
            email: email
        }).then((response) => {
            if(response.status == 200){
                // display popup mail sent
                // mail will have link to change password
                const res = response.data
                if(res.success_msg === 1){
                localStorage.setItem("local_token", res.token)
                localStorage.setItem("reset_user_id", res.user_id)
                setshowMessage(true)
                setalertMessage("Email Sent")
                setTimeout(() =>{
                    setshowMessage(false)
                    setalertMessage("")
                    navigate("/editpassword")
                  }, 5000)
                }
                else{
                    setshowMessage(true)
                setalertMessage("Invalid Email")
                setTimeout(() =>{
                    setshowMessage(false)
                    setalertMessage("")
                  }, 5000)
                }
            }
        }).catch((error) => {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        })
    }
  return (
    <div className='forgotPassword'>{
        isLogged && <Navigate to="/" />
    }
        <div className="form">
            <div className="forgot">{
          showMessage&&<div style={{ left: '0', pointerEvents: 'none', position: 'fixed', top: 0, width: '100%', zIndex: '1500',}}>
          <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="info">{alertMessage}</Alert>
    </Stack>
          </div>
        }
                <div className="login-header">
                    <h3>FORGOT PASSWORD</h3>
                    <p>Please enter Email</p>
                </div>
            </div>
            <form className="forgot-form" onSubmit={handleSubmit}>
                <input type={"email"}
                value={email} 
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter Email" required/>
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPassword