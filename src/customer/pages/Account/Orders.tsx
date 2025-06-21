import React, { useEffect } from 'react'
import OrderItem from './OrderItem'
import store, { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchUserOrderHistory } from '../../../State/customer/orderSlice';

const Orders = () => {
  const dispatch = useAppDispatch();

  const {order} = useAppSelector(store=>store)

  useEffect(()=>{
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""))
  },[])
  return (
    <div className='text-sm min-h-screen'>
      <div className='pb-5'>
        <h1 className='font-semibold'>All Orders</h1>
        <p className='text-gray-500'>from anytime</p>
      </div>

      <div className='space-y-2'>
        {
          order.orders.map((order)=>order.orderItems.map((item)=><OrderItem item={item} order={order}/>))
        }
      </div>

    </div>
  )
}

export default Orders