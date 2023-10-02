import "./userList.scss"
import { DataGrid } from '@mui/x-data-grid';
//import { rows } from "./userListSource"
import { columns } from "./userListSource";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import axios from "axios";
import { user_data } from "../../pages/login/Login";
import { useNavigate } from "react-router-dom";

export const target_user = ""

const UserList = () => {

  const [rows, setrowsdata] = useState([])
  const [target_user_id, settarget_user_id] = useState("");
  const navigate = useNavigate()
  const url = "http://127.0.0.1:5000/Admin/dashboard/users"

  useEffect(() => {
    fetch(url).then((data) => data.json())
    .then((data)=> setrowsdata(data.users))
  }, [])

  console.log(rows)
  
 

  const handleEdit = (e, cellValues) => {
    console.log(cellValues.row)
    settarget_user_id(cellValues.row.user_id)
    target_user = target_user_id
    navigate("/admin/user/modify/single")
    
  }

  const handleDelete = (e, cellValues) => {
    console.log(cellValues.row)
    settarget_user_id(cellValues.row.user_id)
    localStorage.setItem('target_id', cellValues.row.id)
    navigate("/admin/user/delete/single")
  }


    const actionColumn = [{ field: "action", headerName: "Action", width: 200, renderCell: (cellValues)=>{
        return(
          <div className="cellAction">
            <div className="deleteButton" onClick={(e) => {handleDelete(e, cellValues)}}>Delete</div>
          </div>
        )
    }}]
    
    return (
    <div className="userList">
        <DataGrid
            rows={rows}
            columns={columns.concat(actionColumn)}
            pageSize={7}
            rowsPerPageOptions={[7]}
        />
    </div>
    )
}

export default UserList
