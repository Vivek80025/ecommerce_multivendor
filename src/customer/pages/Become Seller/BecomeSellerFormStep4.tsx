
import { Box, TextField } from "@mui/material";

const BecomeSellerFormStep4 = ({ formik }: any) => {
  return (
    <Box>
      <div className="space-y-9">
        <div>
          <TextField
            fullWidth
            name="businessDetails.businessName"
            label="Business Name"
            value={formik.values.businessDetails.businessName}
            onChange={formik.handleChange}
            // marke as touch even user touch not properly
            onBlur={formik.handleBlur}
            error={
              formik.touched.businessDetails?.businessName &&
              Boolean(formik.errors.businessDetails?.businessName)
            }
            helperText={
              formik.touched.businessDetails?.businessName &&
              formik.errors.businessDetails?.businessName
            }
          />
        </div>

        <div>
          <TextField
            fullWidth
            name="sellerName"
            label="Seller Name"
            value={formik.values.sellerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.sellerName && Boolean(formik.errors.sellerName)
            }
            helperText={formik.touched.sellerName && formik.errors.sellerName}
          />
        </div>

        <div>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>

        <div>
          <TextField
            fullWidth
            name="password"
            label="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </div>
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep4;
