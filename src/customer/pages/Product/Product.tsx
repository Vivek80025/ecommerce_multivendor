import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import { Box, Divider, IconButton, useMediaQuery, useTheme, Pagination, useScrollTrigger } from "@mui/material";
import { Block, FilterAlt } from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router-dom";

const Product = () => {
/* 
level 1 - men
level 2 - topwear
level 3 - men_casual_shirts

level 1 - electronics
level 2- mobiles
level 3 - mi_mobiles

level 1 - electronics
level 2 - laptops
level 3 - gaming_laptops
*/


  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const [sort,setSort] = useState("")
  const [page,setPage] = useState(1)
// It is used to read and modify the query string parameters in the URL.
  const [searchParams,setSearchParams] = useSearchParams();

  //If the user navigates to /products/shoes, then category === "shoes"
  const {category} = useParams();
  const {product} = useAppSelector(store=>store);
  const [showFilter,setShowFilter] = useState(false);

  const handleSortChange = (event:any) => {
    setSort(event.target.value);
  }

  const handlePageChange=(value:number)=>{
    setPage(value)
  }

  useEffect(()=>{
    const [minPrice,maxPrice] = searchParams.get("price")?.split("-") || [];
    const color = searchParams.get("color");
    const minDiscount = searchParams.get("discount")?Number(searchParams.get("discount")):undefined;
    const pageNumber = page-1;

    const newFilter = {
      color:color || "",
      minPrice: minPrice ? Number(minPrice):undefined,
      maxPrice: maxPrice ? Number(maxPrice):undefined,
      minDiscount,
      pageNumber: page-1,
      sort: sort,
      category: category,
    }
    dispatch(fetchAllProducts(newFilter))
    
  },[category,searchParams, page,sort])

  return (
    <div className="-z-10 mt-10">
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-700 pb-5 px-9 uppercase space-x-2">
          {category?.split("_").map((item,index)=>(
            <span key={index}>{item}</span>
          ))}
        </h1>
      </div>

      <div className="lg:flex">
        <section className="hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton onClick={()=>setShowFilter(!showFilter)}>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && showFilter && (
                <Box sx={{zIndex:3}} className="absolute top-[60px]">
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl size="small" sx={{width: "200px"}}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
              </Select>
            </FormControl>

          </div>

          <Divider sx={{mb: 2}} />

          <section className="product_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 ">
            {product.products.map((item)=><div key={item.id} className="object-cover">
              <ProductCard item={item} />
              </div>)}
          </section>

          <div className="flex items-center justify-center py-10">
              <Pagination
               onChange={(e,value)=>handlePageChange(value)}
               count={10}
               color="primary"
               variant="outlined" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
