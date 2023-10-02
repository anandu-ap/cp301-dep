import axios from "axios"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./casual.scss"
import { user_data } from "../login/Login"

// user_id=current_user.id,
// leave_category='Casual',
// start_date=request_data["start_date"],
// end_date=request_data["end_date"],
// no_of_days=request_data["no_of_days"],
// purpose_of_leave=request_data["purpose"],
// nature_of_leave=request_data["nature_of_leave"],
// alternative_arrangements=request_data["alternative_arrangements"],
// station_leave_required=request_data["station_leave_required"],
// sl_start_date=request_data["sl_start_date"],
// sl_end_date=request_data["sl_end_date"],
// address_during_leave=request_data["address"],
// phone_number=request_data["phone_number"]

const Casual = (props) => {

    // render on if logged in
    const isLogged = localStorage.getItem('isLogged')

    const [start_date, setstart_date] = useState("");
    const [end_date, setend_date] = useState("");
    const [no_of_days, setno_of_days] = useState(0);
    const [purpose, setpurpose] = useState("");
    const [nature_of_leave, setnature_of_leave] = useState("");
    const [alternative_arrangements, setalternative_arrangements] = useState("");
    const [station_leave_required, setstation_leave_required] = useState("");
    const [sl_start_date, setsl_start_date] = useState("");
    const [sl_end_date, setsl_end_date] = useState("");
    const [address, setaddress] = useState("");
    const [phone_number, setphone_number] = useState("");

    const navigate = useNavigate()

    const url = "http://127.0.0.1:5000/" + localStorage.getItem('role') + "/" + localStorage.getItem('user_id') + "/leave category/casual"

    let handleSubmit = async(e) => {
        e.preventDefault();
        axios.post(url, {
            user_id: localStorage.getItem('user_id'),
            leave_category: "Casual",
            start_date: start_date,
            end_date: end_date,
            no_of_days: no_of_days,
            purpose: purpose,
            nature_of_leave: nature_of_leave,
            alternative_arrangements: alternative_arrangements,
            station_leave_required: station_leave_required,
            sl_start_date: sl_start_date,
            sl_end_date: sl_end_date,
            address: address,
            phone_number: phone_number
        })
        .then((response) => {
            //clear all the values
            if(response.status == 200){
                setstart_date("");
                setend_date("");
                setno_of_days(0);
                setpurpose("");
                setnature_of_leave("");
                setalternative_arrangements("");
                setstation_leave_required("");
                setsl_start_date("");
                setsl_end_date("");
                setaddress("");
                setphone_number("");

                // redirect to list
                navigate("/")
            }
        }).catch((error) => {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
        })
    }

  return (
    <div className="casual">
    {
        (!isLogged) && <Navigate to="/login" />
    }
        <Sidebar />
        <div className="casualContainer">
            <Navbar name="Test" />
            <div className="top">
                <h1>Casual Leave</h1>
            </div>
            <div className="bottom">
                <div className="bottomContent">
                    <form onSubmit={handleSubmit}>
                        <div className="formContainer">
                            <label>Nature of leave required</label>
                            <div className="formButton" onChange={(e) => setnature_of_leave(e.target.value)}>
                                <input className="icon" type="radio" name="nature" value="cl"/>
                                <label>CL</label>
                                <input className="icon" type="radio" name="nature" value="rh"/>
                                <label>RH</label>
                                <input className="icon" type="radio" name="nature" value="scl"/>
                                <label>SCL</label>
                                <input className="icon" type="radio" name="nature" value="on duty"/>
                                <label>ON DUTY</label>
                            </div>
                        </div>
                        <div className="formContainer">
                            <label>Period of Leave</label>
                            <div className="formDuration">
                                <div className="formContainer">
                                    <label>From :</label>
                                    <input type="date" 
                                    value={start_date}
                                    onChange={(e) => setstart_date(e.target.value)}
                                    required
                                    ></input>
                                </div>
                                <div className="formContainer">
                                    <label>To :</label>
                                    <input type={"date"}
                                    value={end_date}
                                    onChange={(e) => setend_date(e.target.value)}
                                        required
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="formContainer">
                            <label>No. of Days</label>
                            <input type="text" 
                                value={no_of_days}
                                onChange={(e) => setno_of_days(e.target.value)}
                                required
                            />
                        </div>
                        <div className="formContainer">
                            <label>Purpose</label>
                            <input type="text"  
                                value={purpose}
                                onChange={(e) => setpurpose(e.target.value)}
                                required
                            />
                        </div>
                        <div className="formContainer">
                            <label>Alternative arrangements for classes, administrative responsibilities, etc. (if any)</label>
                            <input type="text"  
                                value={alternative_arrangements}
                                onChange={(e) => setalternative_arrangements(e.target.value)}
                                required
                            />
                        </div>
                        <div className="formContainer">
                            <label>Whether station leave required</label>
                            <input type="text"  
                                value={station_leave_required}
                                placeholder="Yes/No"
                                onChange={(e) => setstation_leave_required(e.target.value)}
                                required
                            />
                        </div>
                        <div className="formContainer">
                            <label>If Yes to Station Leave </label>
                            <div className="formDuration">
                              <div className="formContainer">
                                <label>Start Date :</label>
                                <input type="date"
                                    value={sl_start_date} 
                                    onChange={(e) => setsl_start_date(e.target.value)} 
                                    ></input>
                              </div>
                              <div className="formContainer">
                                <label>To :</label>
                                <input type="date"
                                value={sl_end_date} 
                                onChange={(e) => setsl_end_date(e.target.value)}
                                ></input>
                              </div>
                            </div>
                        </div>
                        <div className="formContainer">
                            <label>Address during leave</label>
                            <input type="text"  
                                value={address}
                                placeholder="address"
                                onChange={(e) => setaddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="formContainer">
                            <label>Phone No</label>
                            <input type={"tel"} 
                                value={phone_number}
                                onChange={(e) => setphone_number(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Casual
