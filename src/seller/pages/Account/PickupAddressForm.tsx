import React, { useEffect } from 'react'
import { UpdateDetailsFormProps } from './BusinessDetailsForm';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { updateSeller } from '../../../State/seller/sellerSlice';
import { Button, TextField } from '@mui/material';

const PickupAddressForm = ({ onClose }: UpdateDetailsFormProps) => {
  const { seller } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      state: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      mobile: Yup.string().required("Mobile number is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        updateSeller({
          pickupAddress: values,
         
        })
      );
      onClose();
    },
  });

  useEffect(() => {
    if (seller.profile) {
      formik.setValues({
        address: seller.profile.pickupAddress.address,
        city: seller.profile.pickupAddress.city,
        state: seller.profile.pickupAddress.state,
        mobile: seller.profile.pickupAddress.mobile,
      });
    }
  }, [seller.profile]);

  return (
    <>
      <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
        Pickup Address
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <div>
          <TextField
          fullWidth
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="state"
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />
        </div>
        <div>
          <TextField
          fullWidth
          id="mobile"
          name="mobile"
          label="Mobile"
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

export default PickupAddressForm;