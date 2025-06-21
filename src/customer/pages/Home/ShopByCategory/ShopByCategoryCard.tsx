import React from 'react'
import "./ShopByCategoryCard.css"
import { HomeCategory, HomeData } from '../../../../types/HomeCategoryTypes'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../../State/Store'
import { searchProduct } from '../../../../State/customer/ProductSlice'

const ShopByCategoryCard = ({item}:{item:HomeCategory}) => {
  const navigate = useNavigate()
  return (
    // group:-I want the children of this element to react when the parent gets hovered
    <div onClick={()=>navigate(`/products/${item.categoryId}`)} className='flex flex-col gap-3 items-center justify-center cursor-pointer group'>
      <div className='custome-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
        <img className='rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full' src={item.image} alt="" />
      </div>
      <h1>{item.name}</h1> 
    </div>
  )
}

export default ShopByCategoryCard