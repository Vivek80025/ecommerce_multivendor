import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import { Button, Divider } from "@mui/material";
import {
  Add,
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchProductById } from "../../../State/customer/ProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { addItemToCart } from "../../../State/customer/cartSlice";
import { addProductToWishlist } from "../../../State/customer/wishlistSlice";
import { fetchReviewsByProductId } from "../../../State/customer/ReviewSlice";
import RatingCard from "../Review/RattingCard";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product, review } = useAppSelector((store) => store);
  const [activeImg, setActiveImg] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)));
    dispatch(fetchReviewsByProductId({ productId: Number(productId) }));
  }, [productId, dispatch]);

  const handleActiveImg = (value: number) => {
    setActiveImg(value);
  };

  const handleAddCart = () => {
    dispatch(
      addItemToCart({
        jwt: localStorage.getItem("jwt"),
        request: { productId: Number(productId), size: "FREE", quantity },
      })
    );
  };

  const handleAddWishlist = () => {
    dispatch(addProductToWishlist({ productId: Number(productId) }));
  };

  const { wishlist } = useAppSelector((store) => store);

  const isInWishlist = wishlist?.wishlist?.products?.some(
    (p) => p.id === product.product?.id
  );

  const {cart} = useAppSelector(store=>store)

  const isInCart = cart.cart?.cartItems.some((p)=>p.product.id===Number(productId));

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images.map((item: any, index) => (
              <img
                onClick={() => handleActiveImg(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={item}
                alt=""
              />
            ))}
          </div>

          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={product.product?.images[activeImg]}
              alt=""
            />
          </div>
        </section>

        <section>
          <div>
            <h1 className="font-bold text-lg text-primary-color">
              {product.product?.seller?.businessDetails.businessName}
            </h1>
            <p className="text-gray-500 font-semibold">
              {product.product?.title}
            </p>
            <div className="flex justify-between items-center py-2 border border-secondary-color w-[180px] px-3 mt-5">
              <div className="flex gap-1 items-center">
                <span>4</span>
                <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
              </div>
              <Divider orientation="vertical" flexItem />
              <span>{review.reviews.length} Ratings</span>
            </div>

            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">
                ₹ {product.product?.sellingPrice}
              </span>
              <span className="line-through text-gray-400">
                ₹ {product.product?.mrpPrice}
              </span>
              <span className="text-primary-color font-semibold">
                {product.product?.discountPercent}%
              </span>
            </div>
            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above ₹1500.
            </p>
          </div>

          <div className="mt-7 space-y-3">
            <div className="flex item-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex item-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex item-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex item-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                variant="outlined"
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button
                variant="outlined"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Add />
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Button
              onClick={handleAddCart}
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
              disabled={isInCart}
            >
              ADD TO BAG
            </Button>
            <Button
              onClick={handleAddWishlist}
              fullWidth
              variant="outlined"
              startIcon={
                isInWishlist ? (
                  <Favorite sx={{ color: teal[500] }} />
                ) : (
                  <FavoriteBorder sx={{ color: teal[500] }} />
                )
              }
              sx={{ py: "1rem" }}
              disabled={isInWishlist}
            >
              WISHLIST
            </Button>
          </div>
          <div className="mt-5">
            <p>{product.product?.description}</p>
          </div>

          <div className="ratings w-full mt-10">
            <h1 className="font-semibold text-lg pb-4">Review & Ratings</h1>

            <RatingCard />
            <div className="mt-10">
              <div className="space-y-5">
                {review.reviews.map((item) => (
                  <div className="space-y-5">
                    <ReviewCard item={item} />
                    <Divider />
                  </div>
                ))}
                <Button onClick={() => navigate(`/reviews/${productId}`)}>
                  View All {review.reviews.length} Reviews
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Product</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
