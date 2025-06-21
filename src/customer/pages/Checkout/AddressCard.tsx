import { Radio } from '@mui/material'
import React from 'react'
import { Address } from '../../../types/UserType'

const AddressCard = (
  { item, selectedValue, value , handleChange }: { 
    item: Address;
    selectedValue: any;
    value: any;
    handleChange: any;
  }
) => {
  return (
    <div className='p-5 border rounded-md flex border-gray-300'>
      <div>
       <Radio
       checked={value == selectedValue}
       onChange={handleChange}
       value={value}
       name='radio-button'
       /> 
      </div>

      <div className='space-y-3 pt-3'>
        <h1>{item.name}</h1>
        <p className='w-[320px]'>
          {item.address},
          {item.locality},
          {item.city},
          {item.state} - {item.pinCode}

        </p>
        <p><strong>Mobile:</strong>{item.mobile}</p>

      </div>

    </div>
  )
}

export default AddressCard