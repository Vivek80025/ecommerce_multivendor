import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Alert, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { uploadToCloudinary } from '../../../Util/uploadToCloudinary'
import { colors } from '../../../Data/Filter/color'
import { mainCategory } from '../../../Data/category/mainCategory'
import { menLevelTwo } from '../../../Data/category/level two/menLevelTwo'
import { womenLevelTwo } from '../../../Data/category/level two/womenLevelTwo'
import { furnitureLevelTwo } from '../../../Data/category/level two/furnitureLevleTwo'
import { electronicsLevelTwo } from '../../../Data/category/level two/electronicsLavelTwo'
import { menLevelThree } from '../../../Data/category/level three/menLevelThree'
import { womenLevelThree } from '../../../Data/category/level three/womenLevelThree'
import { furnitureLevelThree } from '../../../Data/category/level three/furnitureLevelThree'
import { electronicsLevelThree } from '../../../Data/category/level three/electronicsLevelThree'
import { createProduct } from '../../../State/seller/sellerProductSlice'
import { useAppDispatch, useAppSelector } from '../../../State/Store'


const categoryTwo: { [key: string]: any[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree: { [key: string]: any[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};


// const validationSchema = Yup.object({
//   title: Yup.string()
//     .min(5, "Title should be at least 5 characters long")
//     .required("Title is required"),
//   description: Yup.string()
//     .min(10, "Description should be at least 10 characters long")
//     .required("Description is required"),
//   mrpPrice: Yup.number()
//     .positive("Price should be greater than zero")
//     .required("Price is required"),
//   discountedPrice: Yup.number()
//     .positive("Discounted Price should be greater than zero")
//     .required("Discounted Price is required"),
//   discountPercent: Yup.number()
//     .positive("Discount Percent should be greater than zero")
//     .required("Discount Percent is required"),
//   quantity: Yup.number()
//     .positive("Quantity should be greater than zero")
//     .required("Quantity is required"),
//   color: Yup.string().required("Color is required"),
//   category: Yup.string().required("Category is required"),
//   sizes: Yup.string().required("Sizes are required"),
// })

const AddProduct = () => {

  const[uploadingImg,setUploadingImg] = useState(false)

  const dispatch = useAppDispatch();

  const {sellerProduct} = useAppSelector(store=>store);

  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues:{
      title:'',
      description:'',
      mrpPrice:'',
      sellingPrice:'',
      quantity:'',
      color:'',
      images:[],
      category:'',
      category2:'',
      category3:'',
      sizes:'',
    },

    // validationSchema:validationSchema,
  
    onSubmit:(values)=>{
      console.log("- - - -",values);
      dispatch(createProduct({ 
        request: values, 
        jwt: localStorage.getItem("jwt") 
      }))
    },
  });


  const handleImageChange = async(event:any) => {
    const file = event.target.files[0];
    setUploadingImg(true)
    const image = await uploadToCloudinary(file);

    formik.setFieldValue("images",[...formik.values.images, image]);

    setUploadingImg(false)
  }

  const handleRemoveImage = (index:number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index,1);
    formik.setFieldValue("images",updatedImages);
  }
  const childCategory = (category: any, parentCategoryId: any) => {
    return category.filter((child: any) => {
      return child.parentCategoryId == parentCategoryId;
    });
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  useEffect(() => {
    if (sellerProduct.productCreated || sellerProduct.error) {
      setOpenSnackbar(true)
    }
  }, [sellerProduct.productCreated,sellerProduct.error])


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" size={{xs:12}}>
            <input
              type='file'
              accept='image/*'
              id='fileInput'
              style={{display:"none"}}
              onChange={handleImageChange}
            />

            <label className='relative' htmlFor='fileInput'>
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                <AddPhotoAlternate className='text-gray-700' />
              </span>
              {uploadingImg && (
                <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center'>
                  <CircularProgress />

                </div>
              )}

            </label>

            <div className='flex flex-wrap gap-2'>
              {formik.values.images.map((image, index) =>(
               <div key={index} className='relative'>
                <img
                 className='w-24 h-24 object-cover'
                 src={image}
                 alt={`ProductImage ${index+1}`}
                />
                <IconButton
                onClick={()=>handleRemoveImage(index)}
                className=''
                size='small'
                color='error'
                sx={{
                  position:"absolute",
                  top:0,
                  right:0,
                  outline:"none",
                }}
                >
                  <Close sx={{fontSize:"1rem"}} />
                </IconButton>
               </div> 
              ))}
            </div>

          </Grid>
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              id="title"
              name='title'
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              required
             />
          </Grid>
          <Grid size={{xs:12}}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              name='description'
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              required
             />
          </Grid>
          <Grid size={{xs:12, sm:6, lg:3}}>
            <TextField
              fullWidth
              id="mrp_price"
              name='mrpPrice'
              label="MRP Price"
              type='number'
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              required
             />
          </Grid>
          <Grid size={{xs:12, sm:6, lg:3}}>
            <TextField
              fullWidth
              id="selling_price"
              name='sellingPrice'
              label="Selling Price"
              type='number'
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
              required
             />
          </Grid>
          <Grid size={{xs:12, sm:6, lg:3}}>
            <FormControl
              fullWidth
              error={formik.touched.color && Boolean(formik.errors.color)}
              required
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Color"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {colors.map((color,index) => <MenuItem key={index} value={color.name}>
                  <div className="flex gap-3">
                    <span style={{ backgroundColor: color.hex }} className={`h-5 w-5 rounded-full ${color.name === "White" ? "border" : ""}`}></span>
                    <p>{color.name}</p>
                  </div>
                </MenuItem>)}
              </Select>
              {formik.touched.color && formik.errors.color && (
                <FormHelperText>{formik.errors.color}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{xs:12, sm:6, lg:3}}>
            <FormControl
              fullWidth
              error={formik.touched.sizes && Boolean(formik.errors.sizes)}
              required
            >
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                labelId="sizes-label"
                id="sizes"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Sizes"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="FREE">FREE</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
              {formik.touched.sizes && formik.errors.sizes && (
                <FormHelperText>{formik.errors.sizes}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{xs:12, sm:6, lg:4}}>
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
                {/* <MenuItem value=""><em>None</em></MenuItem> */}
                {mainCategory.map((item,index) => (
                  <MenuItem key={index} value={item.categoryId}>{item.name}</MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{xs:12, sm:6, lg:4}}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category2-label">Second Category</InputLabel>
              <Select
                labelId="category2-label"
                id="category2"
                name="category2"
                value={formik.values.category2}
                onChange={formik.handleChange}
                label="Second Category"
              >
                {formik.values.category &&
                  categoryTwo[formik.values.category]?.map((item,index) => (
                    <MenuItem key={index} value={item.categoryId}>{item.name}</MenuItem>
                  ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{xs:12, sm:6, lg:4}}>
            <FormControl
              fullWidth
              error={formik.touched.category && Boolean(formik.errors.category)}
              required
            >
              <InputLabel id="category-label">Third Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                label="Third Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {formik.values.category2 &&
                  childCategory(
                    categoryThree[formik.values.category],
                    formik.values.category2
                  )?.map((item: any) => (
                    <MenuItem value={item.categoryId}>{item.name}</MenuItem>
                  ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{xs:12}}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={sellerProduct.loading}
            >
              {sellerProduct.loading ? <CircularProgress size="small"
                sx={{ width: "27px", height: "27px" }} /> : "Add Product"}
            </Button>
          </Grid>

        </Grid>

      </form>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen} autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellerProduct.error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {sellerProduct.error ? sellerProduct.error : "Product created successfully"}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AddProduct