import "./authorityApplicationTable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { rows } from "../../applicationSource";
import { columns } from "./authorityApplicationColumns";
import { user_data } from "../../pages/login/Login";

const AuthorityApplicationTable = () => {
    const viewColumn = [{ field: "view", headerName: "View", width: 200, renderCell:()=>{
        return(
          <div className="cellAction">
            <div className="viewButton">view</div>
          </div>
        )
    }}]
    
    return (
        <div className="authorityApplicationTable">
          <DataGrid
            rows={rows}
            columns={columns.concat(viewColumn)}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
    )
}

export default AuthorityApplicationTable