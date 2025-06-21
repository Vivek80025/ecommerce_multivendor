import { Button, CircularProgress, Step, StepLabel, Stepper } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createSeller } from "../../../State/seller/sellerAuthSlice";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];
const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const { sellerAuthSlice } = useAppSelector((store) => store);

  const handleStep = (value: number) => {
    (activeStep < steps.length - 1 || (activeStep > 0 && value == -1)) &&
      setActiveStep(activeStep + value);

    value != -1 && activeStep == steps.length - 1 && handleCreateAccount();
  };
  const handleCreateAccount = () => {
    console.log("create account");
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      GSTIN: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pinCode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: "",
    },
    onSubmit: (values) => {
      console.log(values, "formik submitted");
      dispatch(createSeller(values))
    },
  });

  const handleSubmit = () => {
    //submit form data to server
    formik.handleSubmit();
    console.log("Form Submitted");
  };
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <section className="mt-20 space-y-10">
        <div>
          {activeStep == 0 ? <BecomeSellerFormStep1 formik={formik} /> : ""}
          {activeStep == 1 ? <BecomeSellerFormStep2 formik={formik} /> : ""}
          {activeStep == 2 ? <BecomeSellerFormStep3 formik={formik} /> : ""}
          {activeStep == 3 ? <BecomeSellerFormStep4 formik={formik} /> : ""}
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={() => handleStep(-1)}
            variant="contained"
            disabled={activeStep == 0}
          >
            Back
          </Button>
          <Button
            disabled={sellerAuthSlice.loading}
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit
                : () => handleStep(1)
            }
            variant="contained"
          >
            {activeStep === steps.length - 1 ? (
              sellerAuthSlice.loading ? (
                <CircularProgress
                  size="small"
                  sx={{ width: "27px", height: "27px" }}
                />
              ) : (
                "create account"
              )
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
