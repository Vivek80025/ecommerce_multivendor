import React from 'react'
import { HomeCategory } from '../../../../types/HomeCategoryTypes'
import { useNavigate } from 'react-router-dom'

const ElectronicsCategoryCard = ({item}:{item:HomeCategory}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/products/${item.categoryId}`)}
     className='flex flex-col justify-center cursor-pointer'>
      <img className='object-contain h-10' src={item.image}></img>
      <h1 className='font-semibold text-sm text-center'>{item.name}</h1>
    </div>
  )
}

export default ElectronicsCategoryCard