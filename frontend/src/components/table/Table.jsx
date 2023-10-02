import "./table.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { rows } from "../../datatablesource";
import { useEffect, useState } from "react";
import axios from "axios";
import { user_data } from "../../pages/login/Login";

const List = () => {

  const [rows, setrows] = useState([])

  useEffect(() => {
    const url = "http://127.0.0.1:5000/latest_five_leaves/" + localStorage.getItem("user_id")
    fetch(url).then((data) => data.json())
    .then((data)=> setrows(data.latest_leaves))
  }, [])

  return (
    <TableContainer className="table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Applied Date</TableCell>
            <TableCell className="tableCell">Applied Time</TableCell>
            <TableCell className="tableCell">Leave Category</TableCell>
            <TableCell className="tableCell">Start Date</TableCell>
            <TableCell className="tableCell">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.applied_date}</TableCell>
              <TableCell className="tableCell">{row.applied_time}</TableCell>
              <TableCell className="tableCell">{row.leave_category}</TableCell>
              <TableCell className="tableCell">{row.start_date}</TableCell>
              <TableCell className="tableCell">{row.end_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default List