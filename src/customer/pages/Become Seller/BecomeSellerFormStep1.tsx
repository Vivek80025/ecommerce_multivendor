import { Box, TextField } from "@mui/material";


const BecomeSellerFormStep1 = ({ formik }: any) => {
  return (
    <Box>

      <div className="space-y-9">
        <div>
          <TextField
            fullWidth
            name="mobile"
            label="Mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.error.mobile)}
            helperText={formik.touched.mobile && formik.error.mobile}
          />
        </div>

        <div>
          <TextField
            fullWidth
            name="GSTIN"
            label="GSTIN Number"
            value={formik.values.gstin}
            onChange={formik.handleChange}
            error={formik.touched.gstin && Boolean(formik.error.gstin)}
            helperText={formik.touched.gstin && formik.error.gstin}
          />
        </div>
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;
