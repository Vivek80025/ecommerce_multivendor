import { useEffect } from 'react'
import { UpdateDetailsFormProps } from './BusinessDetailsForm';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { updateSeller } from '../../../State/seller/sellerSlice';
import { Button, TextField } from '@mui/material';

const BankDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
  const { seller } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
    },
    validationSchema: Yup.object({
      accountHolderName: Yup.string().required(
        "Account Holder Name is required"
      ),
      accountNumber: Yup.string().required("Account Number is required"),
      ifscCode: Yup.string().required("IFSC Code is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        updateSeller({
          bankDetails: values,
         
        })
      );
      onClose();
    },
  });

  useEffect(() => {
    if (seller.profile) {
      formik.setValues({
        accountHolderName: seller.profile.bankDetails?.accountHolderName || "",
        accountNumber: seller.profile.bankDetails?.accountNumber || "",
        ifscCode: seller.profile.bankDetails?.ifscCode || "",
      });
    }
  }, [seller.profile]);

  return (
    <>
      <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
        Bank Details
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div>
          <TextField
          fullWidth
          id="accountHolderName"
          name="accountHolderName"
          label="Account Holder Name"
          value={formik.values.accountHolderName}
          onChange={formik.handleChange}
          error={
            formik.touched.accountHolderName &&
            Boolean(formik.errors.accountHolderName)
          }
          helperText={
            formik.touched.accountHolderName && formik.errors.accountHolderName
          }
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="accountNumber"
          name="accountNumber"
          label="Account Number"
          value={formik.values.accountNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
          }
          helperText={
            formik.touched.accountNumber && formik.errors.accountNumber
          }
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="ifscCode"
          name="ifscCode"
          label="IFSC Code"
          value={formik.values.ifscCode}
          onChange={formik.handleChange}
          error={formik.touched.ifscCode && Boolean(formik.errors.ifscCode)}
          helperText={formik.touched.ifscCode && formik.errors.ifscCode}
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

export default BankDetailsForm;