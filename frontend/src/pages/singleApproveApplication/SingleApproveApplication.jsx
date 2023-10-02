import AdminNavbar from "../../components/adminNavbar/AdminNavbar"
import AdminSidebar from "../../components/adminSidebar/AdminSidebar"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./singleApproveApplication.scss"

const SingleApproveApplication = () => {
    const isLogged = localStorage.getItem("isLogged")
  return (
    <div className="single">
        <Sidebar />
        <div className="singleContainer">
            <Navbar />
            <div className="top">
                <h1>APPLICATION : </h1>
            </div>
            <div className="bottom">
                <div className="left">
                    <h1 className="title">Information</h1>
                    <div className="item">
                        <div className="details"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleApproveApplication