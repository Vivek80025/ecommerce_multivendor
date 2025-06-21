import { Box, Button, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Orderstepper from './Orderstepper';
import { Payment } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { cancelOrder, fetchOrderById, fetchOrderItemById } from '../../../State/customer/orderSlice';

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { orderId} = useParams();
  const {orderItemId} = useParams();

  const {order} = useAppSelector(store=>store);


  useEffect(()=>{
    dispatch(fetchOrderById({
      orderId:Number(orderId),
      jwt:localStorage.getItem("jwt") || ""
    }));

    dispatch(fetchOrderItemById({
      orderItemId: Number(orderItemId),
      jwt: localStorage.getItem("jwt") || ""
    }))
  },[orderId,orderItemId])

  const handleCancelOrder = () => {
    dispatch(cancelOrder(orderId))
  }
  return (
    <Box className="space-y-5">
      <section className='flex flex-col gap-5 justify-center items-center'>
        <img className='w-[100px]' src={order.orderItem?.product.images[0]} alt="" />
        <div className='text-sm space-y-1 text-center'>
          <h1 className='font-bold'>{order.orderItem?.product.seller?.businessDetails.businessName}</h1>
          <p className='text-gray-500'>{order.orderItem?.product.title}</p>
          <p className='text-gray-500'><strong>Size:</strong>{order.orderItem?.size}</p>
        </div>
        {(order.currentOrder?.orderStatus==="DELIVERED") &&<div>
          <Button onClick={()=>navigate(`/review/${order.orderItem?.product.id}/create`)}>Write Review</Button>
        </div>}
      </section>

      <section className='border p-5'>
        {order.currentOrder && <Orderstepper orderStatus={order.currentOrder?.orderStatus} order={order.currentOrder} />}
      </section>

      <div className='border p-5'>
        <h1 className='font-bold'>Delivery Address</h1>
        <div className='text-sm space-y-2'>
          <div className='flex gap-5 font-medium'>
            <p>{order.currentOrder?.shippingAddress.name}</p>
            <Divider flexItem orientation='vertical'/>
            <p>{order.currentOrder?.shippingAddress.mobile}</p>
          </div>
          <p>{order.currentOrder?.shippingAddress.address}, {" "}
            {order.currentOrder?.shippingAddress.state},{" "}
            {order.currentOrder?.shippingAddress.city}{" - "}
            {order.currentOrder?.shippingAddress.pinCode}
          </p>
        </div>  
      </div>

      <div className='border space-y-4'>
        <div className='flex justify-between text-sm pt-5 px-5'>
          <div className='space-y-1'>
            <p className='font-bold'>Total Item Price</p>
            <p>You saved {Number(order.orderItem?.mrpPrice) - Number(order.orderItem?.sellingPrice)}.00 on this item</p>
          </div>
          <p className='font-medium'>₹ {order.orderItem?.sellingPrice}.00</p>
        </div>

        <div className='px-5'>
          <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3'>
            <Payment />
            <p>Pay on Delivery</p>
          </div>

        </div>

        <Divider />

        <div className='px-5 pt-5'>
          <p className='text-xs'><strong>Sold by : </strong>{order.orderItem?.product.seller?.businessDetails.businessName}</p>
        </div>

        <div className='p-10'>
          <Button
          disabled={order.currentOrder?.orderStatus==="CANCELLED"}
          onClick={handleCancelOrder}
          color='error'
          sx={{py: '0.7rem'}}
          variant='outlined'
          fullWidth
          >
            {(order.currentOrder?.orderStatus==="CANCELLED")?'order canceled':'Cancel Order'}
          </Button>
           
        </div>

      </div>

    </Box>
  )
}

export default OrderDetails