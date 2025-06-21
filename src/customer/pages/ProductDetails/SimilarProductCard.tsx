
import { Product } from "../../../types/ProductType";
import { useNavigate } from "react-router-dom";

const SimilarProductCard = ({product}:{product:Product}) => {
  const navigate = useNavigate()

  return (
    <div onClick={()=>navigate(`/product-details/${product.category?.categoryId}/${product.title}/${product.id}`)}>
      <div className="group relative">
        <div className="card">
            <img
              className="card-media object-top"
              src={product.images[0]}
              alt=""
            />
        </div>

        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          <div className="name">
            <h1>{product.seller?.businessDetails.businessName}</h1>
            <p>{product.title}</p>
          </div>
          <div className="price flex items-center gap-3">
            <span className="font-sans text-gray-800">₹ {product.sellingPrice}</span>
            <span className="text-gray-400 thin-line-through">₹ {product.mrpPrice}</span>
            <span className="text-primary-color font-semibold">{product.discountPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
