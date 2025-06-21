import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Menu } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellers, updateSellerAccountStatus } from "../../../State/seller/sellerSlice";

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

const accountStatuses = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account is created but not yet verified",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and in good standing",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended, possibly due to violations",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description:
      "Account is deactivated, user may have chosen to deactivate it",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account is permanently banned due to severe violations",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account is permanently closed, possibly at user request",
  },
];

const SellersTable = () => {
  const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
  const {seller} = useAppSelector(store=>store);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
        dispatch(fetchSellers(accountStatus))
    }, [accountStatus])

  const handleChange = (event: SelectChangeEvent) => {
    setAccountStatus(event.target.value as string);
  };

  const handleUpdateSellerAccountStatus = (id: number, status: string) => {
        dispatch(updateSellerAccountStatus({ id, status }))
    }

  const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, sellerId: any) => {
        setAnchorEl((prev) => ({ ...prev, [sellerId]: event.currentTarget }));
    };
    const handleClose = (sellerId: number) => {
        setAnchorEl((prev) => ({ ...prev, [sellerId]: null }));
    };
  return (
    <>
      <div className="pb-5 w-60">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Account Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            label="Account Status"
            onChange={handleChange}
          >
            {accountStatuses.map((item) => (
              <MenuItem value={item.status}>{item.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Seller Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell >Mobile</StyledTableCell>
            <StyledTableCell >GSTIN</StyledTableCell>
            <StyledTableCell >Business Name</StyledTableCell>
            <StyledTableCell >Account Status</StyledTableCell>
            <StyledTableCell >Change Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seller.sellers.map((seller) => (
            <StyledTableRow key={seller.id}>
              <StyledTableCell component="th" scope="row">
                {seller.sellerName}
              </StyledTableCell>
              <StyledTableCell>{seller.email}</StyledTableCell>
              <StyledTableCell >{seller.mobile}</StyledTableCell>
              <StyledTableCell >{seller.GSTIN}</StyledTableCell>
              <StyledTableCell >{seller.businessDetails.businessName}</StyledTableCell>
              <StyledTableCell >{seller.accountStatus}</StyledTableCell>
              <StyledTableCell >
                <Button
                                        id={"basic-button" + seller.id}

                                        onClick={(e) => handleClick(e, seller.id)}
                                    >
                                        Change Status
                                    </Button>
                                    <Menu
                                        id={"basic-menus" + seller.id}
                                        anchorEl={anchorEl[seller.id || 1]}
                                        open={Boolean(anchorEl[seller.id || 1])}
                                        onClose={()=>handleClose(seller.id || 1)}


                                    >
                                        {accountStatuses.map((status) =>
                                            <MenuItem onClick={() => handleUpdateSellerAccountStatus(
                                                seller.id || 1, status.status)} value={status.status}>{status.title}</MenuItem>)}
                                    </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>

    </>
  );
};

export default SellersTable;
