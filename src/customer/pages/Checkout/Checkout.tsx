import { Button } from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import { Add } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createOrder } from "../../../State/customer/orderSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image:
      "https://cdn.iconscout.com/icon/free/png-256/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png?f=webp",
    label: "",
  },
  {
    value: "STRIPE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
    label: "",
  },
];

const Checkout = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway,setPaymentGateway] = useState("RAZORPAY")
  const [value, setValue] = React.useState(0);

  const {auth} = useAppSelector(store=>store)

  const handleChange = (event: any) => {
        console.log("-----", event.target.value)
        setValue(event.target.value);
    };

  const handlePaymentChange = (event:any) => {
    setPaymentGateway(event.target.value)
  }


  const handleCreateOrder=()=>{
    if(auth.user?.addresses){
      dispatch(createOrder(
            {address:auth.user?.addresses[value],
            jwt:localStorage.getItem("jwt") || "",
            paymentGateway,}
          ))
    }
  }

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Dilivery Address</h1>
              <Button onClick={handleOpen} variant="outlined">
                ADD NEW ADDRESS
              </Button>
            </div>

            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="space-y-3">
                {(auth.user?.addresses || []).map((item,index) => (
                  <AddressCard 
                  item={item}
                  selectedValue={value}
                  value={index}
                  handleChange={handleChange}
                  />
                ))}
              </div>
            </div>

            <div className="border border-gray-300 rounded-md py-4 px-5">
              <Button onClick={handleOpen} className="gap-2">
                <Add fontSize="small" />
                <span>ADD NEW ADDRESS</span>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="border border-gray-300 rounded-md p-5 pb-0">
              <h1 className="text-primary-color font-medium text-center">Choose Payment Gateway</h1>
              <RadioGroup
                className="flex justify-between"
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handlePaymentChange}
                value={paymentGateway}
              >
                {paymentGatewayList.map((item) => (
                  <FormControlLabel
                    className="w-[45%] flex justify-center"
                    value={item.value}
                    control={<Radio disabled={item.value === "STRIPE"} />} 
                    label={
                      <img
                        className={`${
                          item.value == "STRIPE" ? "w-14" : ""
                        } object-cover`}
                        src={item.image}
                        alt={item.label}
                      />
                    }
                  />
                ))}
              </RadioGroup>
            </div>

            <div className="border border-gray-300 rounded-md">
              <PricingCard />
              <div className="p-5">
                <Button
                onClick={handleCreateOrder}
                 variant="contained" sx={{ py: "11px" }} fullWidth>
                  checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
