import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../State/Store'
import { sumCartItemMrpPrice } from '../../../Util/sumCartItemMrpPrice'
import { sumCartItemSellingPrice } from '../../../Util/sumCartItemSellingPrice'

const PricingCard = () => {
  const {cart} = useAppSelector(store=>store)
  return (
    <>
      <div className='space-y-3 p-5'>
        <div className='flex justify-between items-center'>
          <span>Subtotal</span>
          <span>₹ {cart.cart?.totalMrpPrice}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>Discount</span>
          <span>₹ {sumCartItemMrpPrice(cart.cart?.cartItems || [])-sumCartItemSellingPrice(cart.cart?.cartItems || [])}</span>
          
        </div>
        <div className='flex justify-between items-center'>
          <span>Shipping</span>
          <span>₹ 79</span>
        </div>
        <div className='flex justify-between items-center'>
          <span>plateform fee</span>
          <span>Free</span>
        </div>

      </div>
      <Divider sx={{width:"full"}}/>

        <div className='flex justify-between items-center p-5 text-primary-color'>
          <span>Total</span>
          <span>₹ {Number(cart.cart?.totalSellingPrice) + 79}</span>
        </div>
    </>
  )
}

export default PricingCard