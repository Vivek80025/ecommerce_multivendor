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
import { fetchSellerOrders, updateOrderStatus } from "../../../State/seller/sellerOrderSlice";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

const orderStatus = [
  { color: "#FFA500", label: "PENDING" },
  { color: "#F5BCBA", label: "PLACED" },
  { color: "#F5BCBA", label: "CONFIRMED" },
  { color: "#1E90FF", label: "SHIPPED" },
  { color: "#32CD32", label: "DELIVERED" },
  { color: "#FF0000", label: "CANCELLED" },
];


const OrderTable = () => {
  //-------------------------------------------------------
  const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});
  const handleClick = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId: number) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: null }));
  };

  //-------------------------------------------------------

  const dispatch = useAppDispatch();
  const { sellerOrder } = useAppSelector((store) => store);
  useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, []);

  const handleUpdateOrder = (orderId:number, orderStatus:any) => {
    dispatch(updateOrderStatus({jwt: localStorage.getItem("jwt") || "" , orderId , orderStatus}));
    handleClose(orderId);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell>Shipping Address</StyledTableCell>
            <StyledTableCell>Order Status</StyledTableCell>
            <StyledTableCell>Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrder.orders.map((order) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell component="th" scope="row">
                {order.id}
              </StyledTableCell>
              <StyledTableCell>
                <div className="flex flex-wrap gap-1">
                  {order.orderItems.map((item) => (
                    <div className="flex gap-5 items-center">
                      <img
                        className="w-20 rounded-md"
                        src={item.product.images[0]}
                        alt=""
                      />
                      <div className="flex flex-col justify-between p-2">
                        <h1>Title: {item.product.title}</h1>
                        <h1>Selling Price: {item.sellingPrice}</h1>
                        <h1>Color: {item.product.color}</h1>
                        <h1>Size: {item.size}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <div className="flex flex-col gap-y-2">
                  <h1>{order.shippingAddress.name}</h1>
                  <h1>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}
                  </h1>
                  <h1>
                    {order.shippingAddress.state} -{" "}
                    {order.shippingAddress.pinCode}
                  </h1>
                  <h1>
                    <strong>Mobile:</strong> {order.shippingAddress.mobile}
                  </h1>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <span className="px-5 py-2 border !border-primary-color rounded-full text-primary-color">
                  {order.orderStatus}
                </span>
              </StyledTableCell>
              <StyledTableCell>
                <div>
                  <Button
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={(e)=>handleClick(e,order.id)}
                  >
                    STATUS
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl[order.id]}
                    open={Boolean(anchorEl[order.id])}
                    onClose={()=>handleClose(order.id)}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    {orderStatus.map((status) => (
                      <MenuItem key={status.label} onClick={()=>(
                       handleUpdateOrder(order.id, status.label) 
                      )}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
