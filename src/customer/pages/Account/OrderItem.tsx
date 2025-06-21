import { ElectricBolt } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'
import { Order, OrderItem as OrderItemType } from '../../../types/orderTypes'
import { useNavigate } from 'react-router-dom'

const OrderItem = ({item,order}:{item:OrderItemType,order:Order}) => {

  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/account/order/${order.id}/${item.id}`)} className='text-small p-5 space-y-5 border rounded-md cursor-pointer'>
      <div className='flex items-center gap-5'>
        <div>
        <Avatar sizes='small' sx={{bgcolor:teal[500]}}>
          <ElectricBolt />
        </Avatar>
        </div>
        <div>
          <h1 className='text-primary-color font-bold'>{order.orderStatus}</h1>
          {(order.orderStatus=="PENDING" || order.orderStatus=="SHIPPED") ? <p className='text-gray-500'>Arriving by {order.deliverDate}</p>
          : <p className='text-gray-500'>On {order.deliverDate}</p>
          }
        </div>
      </div>
      <div className='p-5 bg-teal-50 flex gap-3'>
        <div>
          <img className='w-[70px]' src={item.product.images[0]} alt="" />
        </div>
        <div className='w-full space-y-2 text-sm'>
          <h1 className='font-semibold'>{item.product.seller?.businessDetails.businessName}</h1>
          <p className='text-gray-500'>{item.product.title}</p>
          <p className='text-gray-500'><strong>size : </strong>{item.size}</p>
        </div>

      </div>

    </div>
  )
}

export default OrderItem