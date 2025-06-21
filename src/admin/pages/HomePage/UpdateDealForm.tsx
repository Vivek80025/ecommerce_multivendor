
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../State/Store";
import { updateDeal } from "../../../State/admin/DealSlice";
import { Button, TextField, Typography } from "@mui/material";

const validationSchema = Yup.object({
  discount: Yup.number()
    .required("Discount is required")
    .min(0, "Discount must be a positive number")
    .max(100, "Discount cannot exceed 100"),
  //   category: Yup.string()
  //     .oneOf(Object.values(HomeCategory), 'Invalid category')
  //     .required('Category is required'),
});

// Initial form values
const initialValues = {
  discount: 0,
  category: "",
};





const UpdateDealForm = ({ id }: { id: number }) => {

  


  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Deal submit", values);
      dispatch(
        updateDeal({
          id,
          deal: {
            discount: values.discount,
            category: { id: Number(values.category) },
          },
        })
      );
    },
  });

  // useEffect(() => {
  //     dispatch(fetchHomeCategories());
  // }, []);


  return (
    <>
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div>
        <Typography align="center" variant="h4" gutterBottom>
          Update Deal
        </Typography>
      </div>

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

      <Button
        sx={{ py: ".8rem" }}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Update Deal
      </Button>
    </form>

      
    </>
  );
};

export default UpdateDealForm;
