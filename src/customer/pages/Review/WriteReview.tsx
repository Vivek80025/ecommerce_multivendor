import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../../State/customer/ProductSlice';
import ReviewForm from './ReviewForm';

const WriteReview = () => {

  const dispatch = useAppDispatch();
  const { product} = useAppSelector(store => store)

    const { productId } = useParams()

    useEffect(() => {

        if (productId) {
            dispatch(fetchProductById(Number(productId)))
        }

    }, [productId])
  return (
    <div className='p-5 lg:p-20 flex flex-col lg:flex-row gap-10'>
            <div className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
                <img className='w-full' src={
                    product.product?.images[0]
                } alt="" />
                <div>
                    <div>
                        <p className='font-bold text-xl'> {product.product?.seller?.businessDetails.businessName}

                        </p>
                        <p className='text-lg text-gray-600'>{product.product?.title}</p>
                    </div>

                    <div className='price flex items-center gap-3 mt-5 text-lg'>
                        <span className='font-semibold text-gray-800' > ₹{product.product?.sellingPrice}</span>
                        <span className='text thin-line-through text-gray-400 '>₹{product.product?.mrpPrice}</span>
                        <span className='text-[#00927c] font-semibold'>{product.product?.discountPercent}% off</span>
                    </div>

                </div>
            </div>
            <section className="w-full md:w-1/2 lg:w-[70%]">
                <h1 className="font-semibold text-2xl pb-4 text-gray-700">
                    Write Your Review & Give Ratings
                </h1>
                <ReviewForm />

            </section>
        </div>
  )
}

export default WriteReview