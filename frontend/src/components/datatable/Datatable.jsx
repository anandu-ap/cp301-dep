import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { columns } from "../../datatablesource";
import axios from "axios"
import { useState } from "react";
import { user_data } from "../../pages/login/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Datatable = () => {

  const [rows, setRowsData] = useState([])
  const navigate = useNavigate()
  const user_id = localStorage.getItem('user_id')
  const role = localStorage.getItem('role')
  const url = "http://127.0.0.1:5000/" + role + "/" + user_id + "/leave_applications"

  useEffect(() => {
    fetch(url).then((data) => data.json())
    .then((data)=> setRowsData(data.leaves))
  }, [])

  const handleView = (e, cellValues) => {
    console.log(cellValues.row)
    localStorage.setItem('leave_id', cellValues.row.id)
    navigate("/leave")
  }
  
  const actionColumn = [{ field: "action", headerName: "Action", width: 200, renderCell:(cellValues)=>{
    return(
      <div className="cellAction">
        <div className="viewButton" onClick={(e) => {handleView(e, cellValues)}}>view</div>
        <div className="cancelButton" onClick={(e) => {handleView(e, cellValues)}}>cancel</div>
      </div>
    )
  }}]

  return (
    <div className="datatable">
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  )
}

export default Datatable