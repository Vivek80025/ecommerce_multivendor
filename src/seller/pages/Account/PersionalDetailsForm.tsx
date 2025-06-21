import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateSeller } from "../../../State/seller/sellerSlice";
import { Button, TextField } from "@mui/material";

const PersionalDetailsForm = ({ onClose }: { onClose: any }) => {
  const { seller } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      sellerName: "",
      email: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      sellerName: Yup.string().required("Seller Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile number is required"),
    }),
    onSubmit: (values) => {
      console.log("data ----- ", values);
      dispatch(updateSeller(values));
      onClose();
    },
  });
  useEffect(() => {
    if (seller.profile) {
      formik.setValues({
        sellerName: seller.profile?.sellerName,
        email: seller.profile?.email,
        mobile: seller.profile?.mobile,
      });
    }
  }, [seller.profile]);
  return (
    <>
      <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
        Personal Details
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div>
          <TextField
          fullWidth
          id="sellerName"
          name="sellerName"
          label="Seller Name"
          value={formik.values.sellerName}
          onChange={formik.handleChange}
          error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
          helperText={formik.touched.sellerName && formik.errors.sellerName}
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="email"
          name="email"
          label="Seller Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="mobile"
          name="mobile"
          label="Seller Mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        </div>
        <Button
          sx={{ py: ".9rem" }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default PersionalDetailsForm;
