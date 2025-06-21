import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Modal } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { deleteDeal, getAllDeals } from '../../../State/admin/DealSlice';

import Box from '@mui/material/Box';
import UpdateDealForm from './UpdateDealForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

const DealTable = () => {

  const [selectedDealId, setSelectedDealId] = useState<number>();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id:number) => {
    setSelectedDealId(id);
    setOpen(true)
  }
  const handleClose = () => setOpen(false);


  const dispatch = useAppDispatch();
  const {deals} = useAppSelector(store=>store);

  const handleDelete = (id: any) => () => {
    dispatch(deleteDeal(id))
  }

  useEffect(()=>{
dispatch(getAllDeals());
  },[])
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell >Image</StyledTableCell>
            <StyledTableCell >Category</StyledTableCell>
            <StyledTableCell >Discount</StyledTableCell>
            <StyledTableCell >Edit</StyledTableCell>
            <StyledTableCell >Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deals.deals.map((deal,index) => (
            <StyledTableRow key={deal.id}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell>
                <img className='w-20 rounded-md' src={deal.category.image} alt="" />
              </StyledTableCell>
              <StyledTableCell >{deal.category.categoryId}</StyledTableCell>
              <StyledTableCell >{deal.discount}</StyledTableCell>
              <StyledTableCell >
                <IconButton onClick={() => {
  if (deal.id !== undefined) {
    handleOpen(deal.id);
  }
}}>
                  <Edit className="text-orange-400 cursor-pointer"  />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell >
                <IconButton onClick={handleDelete(deal.id)}>
                  <Delete className="text-red-600 cursor-pointer" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    {selectedDealId && <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateDealForm id={selectedDealId} />
        </Box>
      </Modal>}
    </>
  )
}

export default DealTable