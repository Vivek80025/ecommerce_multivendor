import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchTransactionsBySeller } from "../../../State/seller/transactionSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TransactionTable = () => {
  const dispatch = useAppDispatch();
  const {transactions} = useAppSelector(store=>store)
  useEffect(()=>{
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""))
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell >Customer Details</StyledTableCell>
            <StyledTableCell >Order</StyledTableCell>
            <StyledTableCell >Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.transactions.map((transaction) => (
            <StyledTableRow key={transaction.id}>
              <StyledTableCell component="th" scope="row">
                {transaction.date}
              </StyledTableCell>
              <StyledTableCell >{transaction.customer.email}</StyledTableCell>
              <StyledTableCell >{transaction.order.id}</StyledTableCell>
              <StyledTableCell >{transaction.order.totalSellingPrice}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
