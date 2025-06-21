import React from 'react'
import { Product } from '../../../types/ProductType'
import { Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../../State/Store'
import { addProductToWishlist } from '../../../State/customer/wishlistSlice'
import { useNavigate } from 'react-router-dom'

const WishlistProductCard = ({item}:{item:Product}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCloseButton = (e:any) => {
    e.stopPropagation();
    dispatch(addProductToWishlist({productId:Number(item.id)}))
  }
  return (
    <div className='w-60 relative cursor-pointer' onClick={()=>navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)}>
      <div className='w-full'>
        <img className='object-top w-full h-[300px]' src={item.images[0]} alt="" />
      </div>
      <div className='pt-3 space-y-1'>
        <p>{item.title}</p>
        <div className='price flex items-center gap-3'>
          <span className='font-sans text-gray-800'>₹ {item.sellingPrice}</span>
          <span className='text-gray-400 thin-line-through'>₹ {item.mrpPrice}</span>
          <span className='text-primary-color font-semibold'>{item.discountPercent}% off</span>
        </div>
      </div>
      <div className='absolute top-1 right-1'>
        <Button onClick={handleCloseButton}>
          <Close className='bg-gray-100 rounded-full p-1' />
        </Button>
      </div>
    </div>
  )
}

export default WishlistProductCard