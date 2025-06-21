import { Button, Card, Divider } from "@mui/material";
import { useEffect } from "react";
import TransactionTable from "./TransactionTable";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerReport } from "../../../State/seller/sellerSlice";

const Payment = () => {
  const {seller} = useAppSelector(store=>store)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchSellerReport(localStorage.getItem("jwt") || ""))
  },[])
  return (
    <div className="space-y-5">
      <Card className="space-y-4 p-5 w-[50%]">
        <h1 className="text-gray-600 font-medium">Total Earning:</h1>
        <h1 className="font-bold text-xl">₹{seller.report?.totalEarnings}</h1>
        <div>
          <Divider />
        </div>
        <p className="text-gray-600 font-medium">
          Last Payment : <strong>₹0</strong>
        </p>
      </Card>

      <div className="pt-20 space-y-3">
        <div>
        <Button variant="contained">Transaction</Button>
        </div>
        <div>
        <TransactionTable />
        </div>
        
      </div>
    </div>
  );
};

export default Payment;
