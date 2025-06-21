import { CheckCircle, FiberManualRecord } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Order } from '../../../types/orderTypes';


const formatDate = (dateString: string | Date) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return `on ${date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  })}`;
};


const Orderstepper = ({orderStatus,order}:{orderStatus:any; order:Order;}) => {
  
  const [currentStep,setCurrentStep] = useState(3)

  const steps = [
  { 
    name: "Order Placed", 
    description: formatDate(order.orderDate), 
    value: "PENDING" 
  },
  { name: "Packed",
    description: "Item Packed in Dispatch Warehouse", value: "CONFIRMED" 
  },
  { 
    name: "Shipped", 
    description: formatDate(order.shippedDate), 
    value: "SHIPPED" 
  },
  { 
    name: "Arrived", 
    description: formatDate(order.deliverDate), 
    value: "DELIVERED" 
  },
];
const canceledSteps = [
  {name: "Order Placed", description: formatDate(order.orderDate), value: "PENDING"},
  {name: "Order Canceled", description: formatDate(order.deliverDate), value: "CANCELLED"},
]

const [statusStep,setStatusStep] = useState(steps);

  useEffect(() => {

        if (orderStatus === 'CANCELLED') {
            setStatusStep(canceledSteps)
        } else {
            setStatusStep(steps)
        }
    }, [orderStatus])
  return (
    <Box className="my-10">
      {statusStep.map((step,index) => (
        <>
        <div key={index} className='flex px-4'>
          {/* circle and line */}
          <div className='flex flex-col items-center'>
            {/* for circle */}
            <Box 
            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
              ${index<=currentStep ? "bg-gray-200 text-teal-500" : "bg-gray-300 text-gray-600"} `}
            >
              {step.value === orderStatus ? (<CheckCircle/>) : (<FiberManualRecord/>)}

            </Box>
            {/* for line */}
            {
              index < statusStep.length-1 && (
                <div
                className={`border h-20  w-[2px] 
                  ${index<currentStep ? "bg-primary-color !border-primary-color"
                  : "bg-gray-300 !border-gray-600"
                }`}
                >
            
                </div>
              )
            }

          </div>

          <div className='ml-2 w-full'>
            <div
            className={`${step.value === orderStatus
              ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3 " : ""
            } ${(orderStatus === "CANCELLED" && 
              step.value === orderStatus) ? "bg-red-500" : ""}`}
            >
              <h1>{step.name}</h1>
              <p className={`${step.value === orderStatus ? "text-gray-200" : "text-gray-500"} text-xs`}>
              {step.description}
              </p>

            </div>

          </div>

        </div>
        </>
      ))}

    </Box>
  )
}

export default Orderstepper