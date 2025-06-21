import React, { useEffect, useState } from "react";
import ReportCard from "./Report/ReportCard";
import { AccountBalance } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import SellingChart from "./SellingChart";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerReport } from "../../../State/seller/sellerSlice";

const Chart = [
  { name: "Today", value: "today" },
  { name: "Last 7 days", value: "daily" },
  { name: "Last 12 Month", value: "monthly" },
];

const HomePage = () => {
  const [chartType, setChartType] = useState(Chart[0].value);

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

  const {seller} = useAppSelector(store=>store)
    const dispatch = useAppDispatch()
  
    useEffect(()=>{
      dispatch(fetchSellerReport(localStorage.getItem("jwt") || ""))
    },[])
  return (
    <div className="space-y-5">
      <section className="grid grid-cols-4 gap-5">
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <ReportCard
            icon={<AccountBalance />}
            value={"₹ " + seller.report?.totalEarnings}
            title={"Total Earnings"}
          />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <ReportCard
            icon={<AccountBalance />}
            value={seller.report?.totalSales}
            title={"Total Sales"}
          />
        </div>
        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <ReportCard
            icon={<AccountBalance />}
            value={seller.report?.totalRefunds}
            title={"Total Refund"}
          />
        </div>

        <div className="col-span-4 md:col-span-2 lg:col-span-1">
          <ReportCard
            icon={<AccountBalance />}
            value={seller.report?.canceledOrders}
            title={"Cancel Orders"}
          />
        </div>
      </section>

      <div className="h-[500px] space-y-10 p-5 lg:p-10 bg-slate-800 rounded-md">
        <div className="w-40">
          <FormControl sx={{ color: "white" }} fullWidth>
            <InputLabel sx={{color:'white'}} id="demo-simple-select-label">Chart Type</InputLabel>
            <Select
              sx={{
                color: "white",
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '.MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chartType}
              label="Chart Type"
              onChange={handleChange}
            >
              {Chart.map((item) => (
                <MenuItem value={item.value}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="h-[350px]">
          <SellingChart chartType = {chartType}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
