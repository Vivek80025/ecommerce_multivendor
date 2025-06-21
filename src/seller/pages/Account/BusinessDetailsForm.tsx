import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { updateSeller } from '../../../State/seller/sellerSlice';
import { Button, TextField } from '@mui/material';

export interface UpdateDetailsFormProps {
  onClose: () => void;
}
const BusinessDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
  const dispatch = useAppDispatch();
  const { seller } = useAppSelector((store) => store);
  const formik = useFormik({
    initialValues: {
      businessName: "",
      GSTIN: "",
      accountStatus: "",
    },
    validationSchema: Yup.object({
      businessName: Yup.string().required("Business Name is required"),
      GSTIN: Yup.string().required("GSTIN is required"),
      accountStatus: Yup.string().required("Account Status is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        updateSeller({
          ...values,
          businessDetails: { businessName: values.businessName },
        })
      );
      onClose();
    },
  });

  useEffect(() => {
    if (seller.profile) {
      formik.setValues({
        businessName: seller.profile?.businessDetails?.businessName,
        GSTIN: seller.profile?.GSTIN,
        accountStatus: seller.profile?.accountStatus ?? "",
      });
    }
  }, [seller.profile]);

  return (
    <>
      <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
        Business Details
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div>
          <TextField
          fullWidth
          id="businessName"
          name="businessName"
          label="Business Name"
          value={formik.values.businessName}
          onChange={formik.handleChange}
          error={
            formik.touched.businessName && Boolean(formik.errors.businessName)
          }
          helperText={formik.touched.businessName && formik.errors.businessName}
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="GSTIN"
          name="GSTIN"
          label="GSTIN"
          value={formik.values.GSTIN}
          onChange={formik.handleChange}
          error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
          helperText={formik.touched.GSTIN && formik.errors.GSTIN}
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="accountStatus"
          name="accountStatus"
          label="Account Status"
          value={formik.values.accountStatus}
          onChange={formik.handleChange}
          error={
            formik.touched.accountStatus && Boolean(formik.errors.accountStatus)
          }
          helperText={
            formik.touched.accountStatus && formik.errors.accountStatus
          }
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

export default BusinessDetailsForm;