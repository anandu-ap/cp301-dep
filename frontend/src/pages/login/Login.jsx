import "./login.scss"
import { useState } from "react"
import axios from "axios"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { login } from "../../auth"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'

export const user_data = {
  user_id : "",
  role : ""
};


const Login = () => {

  const navigate = useNavigate()

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showMessage, setshowMessage] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const isalreadyLoggedIn = localStorage.getItem('isLogged')

  let handleSubmit = async(e) => {
    e.preventDefault()
    axios.post("http://127.0.0.1:5000/login", {
      username: username,
      password: password
    }).then((response) => {
      const data = response.data
      if(response.status === 200){
        if (data.success_msg === 1) {
          login(data.access_token)
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('isLogged', true)
          localStorage.setItem('user_id', data.user_id)
          localStorage.setItem('role', data.role)
          if(user_data.role === "Admin"){
            // Access admin home page
            navigate("/admin")
          }
          else{
            // Access normal dashboard
            navigate("/")
          }
        }
        else{
          // wrong username or password
          setshowMessage(true)
          setalertMessage(data.msg)

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
    <div className="login-page">
    {isalreadyLoggedIn && <Navigate to="/" />}
      <div className="form">
        <div className="login">{
          showMessage&&<div style={{ left: '0', pointerEvents: 'none', position: 'fixed', top: 0, width: '100%', zIndex: '1500',}}>
          <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{alertMessage}</Alert>
    </Stack>
          </div>
        }
          <div className="login-header">
            <h3>LOGIN</h3>
            <p>Please enter your credentials to login.</p>
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input  name="username" value={username} onChange={(e) => setusername(e.target.value)} type="text" placeholder="username"/>
          <input  name="password" value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="password"/>
          <button type="submit">login</button>
        </form>
        <p style={{textDecoration:"none", color:"blue"}}><br/>
          <Link to="/forgotpassword">Forgot Password ?</Link>
        </p>
      </div>
    </div>
  )
}

export default Login