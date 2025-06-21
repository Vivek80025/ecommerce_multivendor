import { useEffect } from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../../State/customer/ProductSlice';
import { fetchReviewsByProductId } from '../../../State/customer/ReviewSlice';
import RatingCard from './RattingCard';

const Review = () => {
  const dispatch = useAppDispatch();
    const { product} = useAppSelector(store => store)
    const { review} = useAppSelector(store => store)

    const { productId } = useParams()

    useEffect(() => {
        dispatch(fetchProductById(Number(productId)))
        dispatch(fetchReviewsByProductId({ productId: Number(productId) }))

    }, [productId])
  return (
    <div className='p-5 lg:p-20 flex flex-col lg:flex-row gap-20'>

      <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
      <img src={product.product?.images[0]} alt="" />
      <div>
        <div>
          <p className='font-bold text-xl'>{product.product?.seller?.businessDetails.businessName}</p>
          <p className='text-lg text-gray-600'>{product.product?.title}</p>
        </div>
        <div className='price flex items-center gap-3'>
          <span className='font-sans text-gray-800'>₹{product.product?.sellingPrice}</span>
          <span className='text-gray-400 line-through'>₹{product.product?.mrpPrice}</span>
          <span className='text-primary-color font-semibold'>{product.product?.discountPercent}%</span>
        </div>

      </div>

      </section>

      <section className='space-y-5 w-full'>
        <RatingCard />
        {review.reviews.map((item)=><div className='space-y-3'><ReviewCard item={item} />
        <Divider/>
        </div>)}

      </section>

    </div>
  )
}

export default Review