import { useEffect, useState } from 'react'
import "./ProductCard.css"
import { Favorite, FavoriteBorder, ModeComment } from '@mui/icons-material'
import { Button } from '@mui/material'
import { teal } from '@mui/material/colors'
import { Product } from '../../../types/ProductType'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { addProductToWishlist } from '../../../State/customer/wishlistSlice'

const ProductCard = ({item}:{item:Product}) => {
  const [currentImage,setCurrentImage]=useState(0);
  const [isHovered,setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {wishlist} = useAppSelector(store=>store)
   const isInWishlist = wishlist?.wishlist?.products?.some(
    (product) => product.id === item.id
  );

  useEffect(()=>{
    let interval:any
    if(isHovered){
      interval = setInterval(()=>{
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      },1000)
    }
    // else if(interval){
    //   clearInterval(interval) 
    //   interval=null
    // }

    //cleanup function
    return () => clearInterval(interval)

  },[isHovered])

  const handleWishlist=(e:any)=>{
    e.stopPropagation();
    dispatch(addProductToWishlist({productId:Number(item.id)}))
  }
  const handleAI=(e:any)=>{
    e.stopPropagation();
  }
  return (
    <>
    <div onClick={()=>navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className='group px-4 relative'>
      <div className='card overflow-hidden'
      onMouseEnter={()=>setIsHovered(true)}
      onMouseLeave={()=>setIsHovered(false)}
      >
        {item.images.map((item,index)=>
        <img key={index} className='card-media object-top' src={item} alt=""
        style={{transform: `translateX(${(index-currentImage)*100}%)`}} 
        />)}

        {isHovered && <div className='indicator flex flex-col items-center space-y-2'>

          <div className='flex gap-3'>
            <Button onClick={handleWishlist} variant='contained' color='secondary'>
              {/* <Favorite sx={{color:teal[500]}}/> */}
              {isInWishlist ? (
                  <Favorite sx={{ color: teal[500] }} />
                ) : (
                  <FavoriteBorder sx={{ color: teal[500] }} />
                )}
            </Button>
            <Button onClick={handleAI} variant='contained' color='secondary'>
              <ModeComment sx={{color:teal[500]}}/>
            </Button>
          </div>

        </div>}

      </div>

      <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
        <div className='name'>
          <h1>{item.seller?.businessDetails.businessName}</h1>
          <p>{item.title}</p>
        </div>
        <div className='price flex items-center gap-3'>
          <span className='font-sans text-gray-800'>₹ {item.sellingPrice}</span>
          <span className='text-gray-400 thin-line-through'>₹ {item.mrpPrice}</span>
          <span className='text-primary-color font-semibold'>{item.discountPercent}%</span>
        </div>

      </div>

    </div>
    </>
  )
}

export default ProductCard