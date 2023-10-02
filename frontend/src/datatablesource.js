export const columns = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'applied_date', headerName: 'Applied Date', width: 120 },
    { field: 'applied_time', headerName: 'Applied Time', width: 120 },
    { field: 'leave_category', headerName: 'Leave Category', width: 130 },
    { field: 'start_date', headerName: 'Start Date', width: 120 },
    { field: 'end_date', headerName: 'End Date', width: 120 },
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


export const rows = [
    {
        id: 1,
        title: "Test 1",
        type: "Casual",
        date: "1 March 2022",
        status: "Approved",
    },
    {
        id: 2,
        title: "Test 2",
        type: "Casual",
        date: "1 March 2022",
        status: "Approved",
    },
    {
        id: 3,
        title: "Test 3",
        type: "Non Casual",
        date: "1 March 2022",
        status: "Pending",
    },
    {
        id: 4,
        title: "Test 4",
        type: "Non Casual",
        date: "1 March 2022",
        status: "Pending",
    }
];