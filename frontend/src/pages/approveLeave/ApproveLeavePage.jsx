import "./approveLeavePage.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useEffect } from "react"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

const ApproveLeavePage = () => {

  const isLogged = localStorage.getItem('isLogged')
  const role = localStorage.getItem('role')
  const isAuthority = ((role === "HOD")||(role==="Administration")||(role=="Authority"))?true:false

    const leave_id = localStorage.getItem("leave_id")
  const user_id = localStorage.getItem("user_id")
  const request_type = localStorage.getItem('request_type')
  const navigate = useNavigate()

  const [name, setname] = useState("");
  const [department, setdepartment] = useState("");
  const [designation, setdesignation] = useState("");
  const [remaining_leaves, setremaining_leaves] = useState(0);
  const [applied_date, setapplied_date] = useState("");
  const [applied_time, setapplied_time] = useState("");
  const [leave_category, setleave_category] = useState("");
  const [nature_of_leave, setnature_of_leave] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [no_of_days, setno_of_days] = useState(0);
  const [purpose_of_leave, setpurpose_of_leave] = useState("");
  const [alternative_arrangements, setalternative_arrangements] = useState("");
  const [station_leave_required, setstation_leave_required] = useState("");
  const [sl_start_date, setsl_start_date] = useState("");
  const [sl_end_date, setsl_end_date] = useState("");
  const [address_during_leave, setaddress_during_leave] = useState("");
  const [phone, setphone] = useState("");
  const [hod_status, sethod_status] = useState("");
  const [hod_remarks, sethod_remarks] = useState("");
  const [administration_status, setadministration_status] = useState("");
  const [administration_remarks, setadministration_remarks] = useState("");
  const [dean_registrar_status, setdean_registrar_status] = useState("");
  const [dean_registrar_remarks, setdean_registrar_remarks] = useState("");
  const [cancel, setcancel] = useState(0);
  const [cancel_leave_remarks, setcancel_leave_remarks] = useState("");
  const [cancel_from, setcancel_from] = useState("");
  const [cancellation_status, setcancellation_status] = useState("");

  const [isNonCasual, setisNonCasual] = useState(true);
  const [istoCancel, setistoCancel] = useState(true);
  const [isWithdrawButton, setisWithdrawButton] = useState(false);
  const [isCancelButton, setisCancelButton] = useState(false);
  const [isApplicant, setisApplicant] = useState(false);
  const [isApproveButton, setisApproveButton] = useState(false);
  const [isRejectButton, setisRejectButton] = useState(false);
  const [isAuthorityCancelButton, setisAuthorityCancelButton] = useState(false);
  const [isRejectCancellationButton, setisRejectCancellationButton] = useState(false);
  const [isRecommendButton, setisRecommendButton] = useState(false);
  const [isDontRecommendButton, setisDontRecommendButton] = useState(false);
  const [isVerifyButton, setisVerifyButton] = useState(false);
  const [action, setaction] = useState("update");

  const handleApprove = async(e) => {
      const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/" + "leave requests/" + leave_id + "/Sanctioned/" + action
      fetch(url).then((data) => data.json())
    .then((data)=> {}, [])

    navigate("/approveapplication")
  }

  const handleReject = async(e) => {
    const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/" + "leave requests/" + leave_id + "/Not Sanctioned/" + action
    fetch(url).then((data) => data.json())
  .then((data)=> {}, [])

  localStorage.setItem('remark_type', "leave")

  navigate("/remarks")

      
  }

  const handleApproveCancellation = async(e) => {
      //
      const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/leave requests/" + leave_id + "/cancel/Cancel"
      fetch(url).then((data) => data.json())
    .then((data)=> {}, [])

    navigate("/approvecancellationrequests")
  }

  const handleRejectCancellation = async(e) => {
      //
      const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/leave requests/" + leave_id + "/cancel/nCancel"
      fetch(url).then((data) => data.json())
    .then((data)=> {}, [])

    localStorage.setItem('remark_type', "cancel")

    navigate("/approveapplication")
  }

  const handleRecommend = async(e) => {
      //
      const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/" + "leave requests/" + leave_id + "/Recommended/" + action
      fetch(url).then((data) => data.json())
    .then((data)=> {}, [])

    navigate("/approveapplication")
  }

  const handleDontRecommend = async(e) => {
      //
      const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/" + "leave requests/" + leave_id + "/Not Recommended/" + action
      fetch(url).then((data) => data.json())
    .then((data)=> {}, [])

    localStorage.setItem('remark_type', "leave")

    navigate("/remarks")
  }

  const handleVerify = async(e) => {
      //
      const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/" + "leave requests/" + leave_id + "/Verified/" + action
      fetch(url).then((data) => data.json())
    .then((data)=> {}, [])

    navigate("/approveapplication")
  }

  const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/leave requests/" + request_type + "/" + leave_id

  useEffect(() => {
    fetch(url).then((data) => data.json())
    .then((data)=> {
      setname(data.name)
      setdepartment(data.department)
      setdesignation(data.designation)
      setapplied_date(data.applied_date)
      setapplied_time(data.applied_date)
      setleave_category(data.leave_category)
      setnature_of_leave(data.nature_of_leave)
      setstart_date(data.start_date)
      setend_date(data.end_date)
      setno_of_days(data.no_of_days)
      setpurpose_of_leave(data.purpose_of_leave)
      setalternative_arrangements(data.alternative_arrangements)
      setstation_leave_required(data.station_leave_required)
      setsl_start_date(data.sl_start_date)
      setsl_end_date(data.sl_end_date)
      setaddress_during_leave(data.address_during_leave)
      setphone(data.phone)
      sethod_status(data.hod_status)
      sethod_remarks(data.hod_remarks)
      setadministration_status(data.administration_status)
      setadministration_remarks(data.administration_remarks)
      setdean_registrar_status(data.dean_registrar_status)
      setdean_registrar_remarks(data.dean_registrar_remarks)
      setcancel(data.cancel)
      setcancel_leave_remarks(data.cancel_leave_remarks)
      setcancel_from(data.cancel_from)
      setcancellation_status(data.cancellation_status)
      setremaining_leaves(data.remaining_leaves)

      console.log(data)

      if(data.hod_status === ""){
        setisWithdrawButton(true)
        sethod_status("Pending")
        setaction("insert")
      }

      if(data.hod_status === "Sanctioned" || data.dean_registrar_status === "Sanctioned"){
        setisCancelButton(true)
      }

      if(role === "Applicant"){
        setisApplicant(true)
      }

      if(data.leave_category === "Casual"){
        setisNonCasual(false)
      }
      if(data.cancel === 0){
        setistoCancel(false)
      }

      if((data.leave_category === 'Casual' && data.hod_status === "")||(role === "Authority" && data.leave_category === "Non Casual" && data.administration_status === "Verified" && data.dean_registrar_status === "")){
        setisApproveButton(true)
      }

      if((data.leave_category==="Casual" && data.hod_status === "")||(data.leave_category === "Casual" && data.hod_status === "Sanctioned" && data.cancel=== 0)||(role==="Administration" && data.leave_category === "Non Casual" && data.administration_status === "")||(role==="Authority"&&data.leave_category==="Non Casual"&&data.administration_status==="Verified"&&data.dean_registrar_status==="")||(role==="Authority"&&data.leave_category==="Non Casual"&&data.dean_registrar_status==="Sanctioned"&&data.cancel===0)){
        setisRejectButton(true)
      }

      if((role==="HOD"&&data.leave_category==="Casual"&&data.hod_status==="Sanctioned"&&data.cancel===1)||(role==="Authority"&&data.dean_registrar_status==="Sanctioned"&&data.cancel===1)){
        setisAuthorityCancelButton(true)
        setisRejectCancellationButton(true)
      }

      if((role==="HOD"&&data.leave_category==="Non Casual"&&data.hod_status==="")){
        setisRecommendButton(true)
        setisDontRecommendButton(true)
      }

      if((role==="Administration" && data.leave_category==="Non Casual" && data.administration_status==="")){
        setisVerifyButton(true)
      }

      console.log(isApproveButton)

    })
  }, [])

  return (
    <div className="single">
    {
      (!isLogged) && <Navigate to="/login" />
    }
    {
      (!isAuthority) && <Navigate to="/" />
    }
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <h1>Application</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <h1 className="title">Leave Information : </h1>
            <div className="item">
              <div className="details">
              <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">{name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Department:</span>
                  <span className="itemValue">{department}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Designation:</span>
                  <span className="itemValue">{designation}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Leaves Remaining:</span>
                  <span className="itemValue">{remaining_leaves}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Applied on :</span>
                  <span className="itemValue">{applied_date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Applied At:</span>
                  <span className="itemValue">{applied_time}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Leave Category</span>
                  <span className="itemValue">{leave_category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nature of Leave :</span>
                  <span className="itemValue">{nature_of_leave}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Start Date:</span>
                  <span className="itemValue">{start_date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">End Date:</span>
                  <span className="itemValue">{end_date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">No. of Days:</span>
                  <span className="itemValue">{no_of_days}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Purpose:</span>
                  <span className="itemValue">{purpose_of_leave}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Alternative Arrangements (if Any):</span>
                  <span className="itemValue">{alternative_arrangements}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Station Leave Required:</span>
                  <span className="itemValue">{station_leave_required}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Station Leave Start Date:</span>
                  <span className="itemValue">{sl_start_date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Station Leave End Date:</span>
                  <span className="itemValue">{sl_end_date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address during leave:</span>
                  <span className="itemValue">{address_during_leave}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">HOD Status:</span>
                  <span className="itemValue">{hod_status}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">HOD Remarks:</span>
                  <span className="itemValue">{hod_remarks}</span>
                </div>
                {
                  isNonCasual && <div className="detailItem">
                  <span className="itemKey">Administration Status:</span>
                  <span className="itemValue">{administration_status}</span>
                </div>
                }
                {
                  isNonCasual && <div className="detailItem">
                  <span className="itemKey">Administration Remarks:</span>
                  <span className="itemValue">{administration_remarks}</span>
                </div>
                }
                {
                  isNonCasual && <div className="detailItem">
                  <span className="itemKey">Dean / Registrar Status:</span>
                  <span className="itemValue">{dean_registrar_status}</span>
                </div>
                }
                {
                  isNonCasual && <div className="detailItem">
                  <span className="itemKey">Dean / Registrar Remarks:</span>
                  <span className="itemValue">{dean_registrar_remarks}</span>
                </div>
                }
                {
                  istoCancel && <div className="detailItem">
                  <span className="itemKey">Cancel Leave Remarks:</span>
                  <span className="itemValue">{cancel_leave_remarks}</span>
                </div>
                }
                {
                  istoCancel && <div className="detailItem">
                  <span className="itemKey">Cancel From:</span>
                  <span className="itemValue">{cancel_from}</span>
                </div>
                }
                {
                  istoCancel && <div className="detailItem">
                  <span className="itemKey">Cancellation Status:</span>
                  <span className="itemValue">{cancellation_status}</span>
                </div>
                }
              </div>
            </div>
            <div className="buttongr">
            {
              (isWithdrawButton && isApplicant) && <button style={{"backgroundColor":"teal"}} className="del" >WITHDRAW</button>
            }
            {
              (isCancelButton && isApplicant) && <button style={{"backgroundColor":"teal"}} className="del" >CANCEL</button>
            }
            {
              isApproveButton && <button style={{"backgroundColor":"green"}} className="del" onClick={handleApprove}>APPROVE</button>
            }
            {
              isRejectButton && <button style={{"backgroundColor":"red"}} className="del" onClick={handleReject}>REJECT</button>
            }
            {
              isAuthorityCancelButton && <button style={{"backgroundColor":"green"}} className="del" onClick={handleApproveCancellation}>APPROVE CANCEL REQUEST</button>
            }
            {
              isRejectCancellationButton && <button style={{"backgroundColor":"red"}} className="del" onClick={handleRejectCancellation}>REJECT CANCEL REQUEST</button>
            }
            {
              (isRecommendButton) && <button style={{"backgroundColor":"green"}} className="del" onClick={handleRecommend}>RECOMMEND</button>
            }
            {
              (isDontRecommendButton) && <button style={{"backgroundColor":"orange"}} className="del" onClick={handleDontRecommend}>DONT RECOMMEND</button>
            }
            {
              (isVerifyButton) && <button style={{"backgroundColor":"green"}} className="del" onClick={handleVerify}>VERIFY</button>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApproveLeavePage