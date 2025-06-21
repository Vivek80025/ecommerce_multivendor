import { useEffect } from 'react'
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from '@mui/material';
import {DeleteOutline } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteCoupon, fetchAllCoupons } from '../../../State/admin/AdminCouponSlice';

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



const Coupon = () => {
  const dispatch = useAppDispatch();
  const {adminCoupon} = useAppSelector(store=>store);
  useEffect(()=>{
    dispatch(fetchAllCoupons(localStorage.getItem("jwt") || ""))
  },[])

  const handleDeleteCoupon = (id:number) => {
        dispatch(deleteCoupon({ id, jwt: localStorage.getItem("jwt") || "" }))
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Coupon Code</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell >End Date</StyledTableCell>
            <StyledTableCell >Min Order Value</StyledTableCell>
            <StyledTableCell >Discount %</StyledTableCell>
            <StyledTableCell >Status</StyledTableCell>
            <StyledTableCell >Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminCoupon.coupons.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.code}
              </StyledTableCell>
              <StyledTableCell>{item.validityStartDate}</StyledTableCell>
              <StyledTableCell >{item.validityEndDate}</StyledTableCell>
              <StyledTableCell >{item.minimumOrderValue}</StyledTableCell>
              <StyledTableCell >{item.discountPercentage}%</StyledTableCell>
              <StyledTableCell >{item.active ? "Active" : "Deactive"}</StyledTableCell>
              <StyledTableCell >
                <IconButton onClick={() => handleDeleteCoupon(item.id)}>
                  <DeleteOutline className='text-red-700 cursor-pointer' />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
  )
}

export default Coupon