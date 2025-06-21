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
import { fetchSellerProduct } from "../../../State/seller/sellerProductSlice";
import { Button, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ProductTable = () => {
  const dispatch = useAppDispatch();
  const {sellerProduct} = useAppSelector(store=>store)
  useEffect(()=>{
    dispatch(fetchSellerProduct(localStorage.getItem('jwt')))
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell >Title</StyledTableCell>
            <StyledTableCell >MRP</StyledTableCell>
            <StyledTableCell >Selling Price</StyledTableCell>
            <StyledTableCell >Color</StyledTableCell>
            <StyledTableCell >Update Stock</StyledTableCell>
            <StyledTableCell >Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerProduct.products.map((item) => (

            // Image	Title	MRP	Selling Price	Color	Update Stock	Update
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                <div className="flex gap-1 flex-wrap">
                  {item.images.map((image)=><img className="w-20 rounded-md" src={image} alt="" />)}
                </div>
              </StyledTableCell>
              <StyledTableCell >{item.title}</StyledTableCell>
              <StyledTableCell >{item.mrpPrice}</StyledTableCell>
              <StyledTableCell >{item.sellingPrice}</StyledTableCell>
              <StyledTableCell >{item.color}</StyledTableCell>
              <StyledTableCell >{
                <Button size="small">
                  in_stock
                </Button>
                }</StyledTableCell>
              <StyledTableCell >{
                <IconButton color="primary" size="small">
                  <Edit/>
                </IconButton>
                }</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
