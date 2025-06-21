import React from 'react'
import SimilarProductCard from './SimilarProductCard'
import { useAppSelector } from '../../../State/Store'

const SimilarProduct = () => {
  const {product} = useAppSelector((store)=>store);
  return (
    <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4 gap-y-8'>

      {product.products.map((item)=> <div className='object-cover'>
        <SimilarProductCard product={item}/>
        </div>)}

    </div>
  )
}

export default SimilarProduct