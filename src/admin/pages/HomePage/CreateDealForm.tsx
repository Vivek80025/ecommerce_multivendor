import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createDeal } from "../../../State/admin/DealSlice";

const CreateDealForm = () => {
  const dispatch = useAppDispatch();
  const {home} = useAppSelector(store=>store);

  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Data -- :", values);
      dispatch(createDeal({
        discount: values.discount, category: {
          id: values.category
        }
      }))
    },
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, margin: "auto", padding: 3 }}
      className="space-y-6"
    >
      <div>
        <Typography className="text-center" variant="h4" gutterBottom>
          Create Deal
        </Typography>
      </div>

      {/* Image Field */}
      <div>
        <TextField
          fullWidth
          id="discount"
          name="discount"
          label="Discount"
          type="number"
          value={formik.values.discount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.discount && Boolean(formik.errors.discount)}
          helperText={formik.touched.discount && formik.errors.discount}
        />
      </div>

      <div>
        <FormControl
          fullWidth
          error={formik.touched.category && Boolean(formik.errors.category)}
          required
        >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            label="Category"
          >
            {home.homePageData?.dealCategories.map((item)=>
              <MenuItem value={item.id}>{item.categoryId}</MenuItem>
            )}
          </Select>
          {formik.touched.category && formik.errors.category && (
            <FormHelperText>{formik.errors.category}</FormHelperText>
          )}
        </FormControl>
      </div>

      {/* Submit Button */}
      <div>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ py: ".9rem" }}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default CreateDealForm;
