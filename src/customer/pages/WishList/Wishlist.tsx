import { useEffect} from "react";
import WishlistProductCard from "./WishlistProductCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { getWishlistByUserId } from "../../../State/customer/wishlistSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((store) => store);
  useEffect(() => {
    dispatch(getWishlistByUserId());
  }, []);
  return (
    <div className="h-[85vh] p-5 lg:p-20">
      {wishlist.wishlist?.products.length ? (
        <div>
          <h1>
            <strong>My WishList</strong> {wishlist.wishlist?.products.length}{" "}
            items
          </h1>
          <div className="flex flex-wrap gap-5 pt-10">
            {wishlist.wishlist?.products.map((item) => (
              <WishlistProductCard item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center flex-col">
          <div className="text-center py-5">
            <h1 className="text-lg font-medium">hay its feels so light!</h1>
            <p className="text-gray-500 text-sm">
              there is nothing in your wishlist, lets add some items
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
