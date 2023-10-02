import "./approveHistory.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import AuthorityApplicationTable from "../../components/authorityApplicationTable/AuthorityApplicationTable"

const ApproveHistory = (props) => {
  return (
    <div className="approvehistory">
        <Sidebar />
        <div className="approveContainer">
            <Navbar name={props.user_id} />
            <div className="top">
                <h1>LEAVE REQUESTS</h1>
            </div>
            <div className="bottom">
                <AuthorityApplicationTable user_id={props.user_id}/>
            </div>
        </div>
    </div>
  )
}

export default ApproveHistory