import "./home.scss"
import "../../components/sidebar/Sidebar"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Widget from "../../components/widget/Widget"
import List from "../../components/table/Table"
import { Link } from "react-router-dom"
import { useAuth } from "../../auth"
import { useNavigate } from "react-router-dom"
import {Redirect} from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"


const Home = () => {
  
  // render only if logged in and role != admin
  // go to log in and if role error print your role is admin,visit admin home
    const logged = localStorage.getItem('isLogged')
    const log_role = localStorage.getItem("role")
    const isAdmin = (log_role === "Admin") ? true : false
      return (
        <div className="home">
        {
          (!logged) && <Navigate to="/login" />
        }
        {
          isAdmin && <Navigate to="/admin" />
        }
            <Sidebar />
            <div className="homeContainer">
              <Navbar />
              <div className="widgets">
                <Widget type="casual"/>
                <Widget type="noncasual"/>
              </div>
              <div className="listContainer">
                <div className="listTitle">LATEST APPLICATIONS : <Link to="/leavehistory" style={{textDecoration:"none"}}> view all </Link></div>
                <List />
              </div>
            </div>
        </div>
      )
}

export default Home