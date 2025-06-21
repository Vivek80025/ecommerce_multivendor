import { Delete } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Rating } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { Review } from "../../../types/reviewTypes";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { deleteReview } from "../../../State/customer/ReviewSlice";

const ReviewCard = ({item}:{item:Review}) => {
  const {auth} = useAppSelector(store=>store)
  const dispatch = useAppDispatch();
  const handleDeleteReview = () => {
    dispatch(deleteReview({ reviewId: item.id, jwt: localStorage.getItem("jwt") || "" }))
  };
  return (
    <div className="flex justify-between">
      <Grid container spacing={9}>
        <Grid size={{ xs: 1 }}>
          <Box>
            <Avatar sx={{ bgcolor: "#9155FD", width: 56, height: 56 }}>
              {item.user.fullName[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid>

        <Grid size={{ xs: 9 }}>
          <div className="">
            <div>
              <p className="font-semibold text-lg">{item.user.fullName}</p>
              <p className="opacity-70">{item.createdAt}</p>
            </div>
          </div>
          <Rating readOnly value={item.rating} defaultValue={2.5} precision={0.5} />
          <p>{item.reviewText}</p>
          <div className="flex flex-wrap">
            {item.productImages.map((image)=> <img className="w-24 h-24 object-cover" src={image} alt="" />)}
          </div>
        </Grid>
      </Grid>

      {(item.user.id === auth.user?.id) && <div>
        <IconButton onClick={handleDeleteReview}>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>}
    </div>
  );
};

export default ReviewCard;
