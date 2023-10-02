export const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'User', width: 200 },
    { field: 'type', headerName: 'Type', width: 200 },
    { field: 'days', headerName: 'Days', width: 200 },
    { 
        field: 'status', 
        headerName: 'Status', 
        width: 130,
        renderCell: (params)=>{
            return(
                <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
            )
        }
    },
];