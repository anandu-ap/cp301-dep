import "./approveCancelTable.scss"
import { DataGrid } from '@mui/x-data-grid';
// import { rows } from "../../applicationSource";
import { columns } from "./approveCancelTableColumns";
import { user_data } from "../../pages/login/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ApproveCancelTable = () => {
    const [rows, setRowsData] = useState([])
  const navigate = useNavigate()
  const user_id = localStorage.getItem('user_id')
  const role = localStorage.getItem('role')
  const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/leave requests"

  useEffect(() => {
    fetch(url).then((data) => data.json())
    .then((data)=> setRowsData(data.leave_cancellation_requests))
  }, [])

  const handleView = (e, cellValues) => {
    console.log(cellValues.row)
    localStorage.setItem('leave_id', cellValues.row.id)
    localStorage.setItem('request_type', 'Cancel')
    navigate("/approveleave")
  }

    const actionColumn = [{ field: "action", headerName: "Action", width: 200, renderCell:(cellValues)=>{
        return(
          <div className="cellAction">
            <div className="viewButton" onClick={(e) => {handleView(e, cellValues)}}>view</div>
            <div className="approveButton" onClick={(e) => {handleView(e, cellValues)}}>approve</div>
            <div className="rejectButton" onClick={(e) => {handleView(e, cellValues)}}>reject</div>
          </div>
        )
    }}]

  return (
    <div className="approvetable">
        <DataGrid
            rows={rows}
            columns={columns.concat(actionColumn)}
            pageSize={7}
            rowsPerPageOptions={[7]}
        />
    </div>
  )
}

export default ApproveCancelTable