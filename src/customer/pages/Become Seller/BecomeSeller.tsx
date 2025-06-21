import { useState } from 'react'
import SellerAccountForm from './SellerAccountForm'
import SellerLoginForm from './SellerLoginForm'
import { Button } from '@mui/material'

const BecomeSeller = () => {
  const [isLogin,setIsLogin] = useState(false)
  const handleShowpage=()=>{
    setIsLogin(!isLogin)
  }
  return (
    <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
      <section className='lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg rounded-b-md'>

        {!isLogin?<SellerAccountForm/>:<SellerLoginForm/>}

        <div className='mt-10 space-y-2'>
          <h1 className='text-center text-sm font-medium'>
            {!isLogin?"have account ?":"Don't have account ?"}
          </h1>

          <Button onClick={handleShowpage} fullWidth sx={{py:'11px'}} variant='outlined'>
            {!isLogin?"Login":"Register"}
          </Button>

        </div>
      </section>

      <section className='hidden lg:col-span-2 md:col-span-1 md:flex items-center justify-center'>
        <div className='lg:w-[70%] px-5 space-y-10'>
          <div className='space-y-2 font-bold text-center border rounded-md'>
            <p className='text-2xl'>Join the marketplace Revolution</p>
            <p className='text-lg text-teal-500'>Boost Your Sales Today</p>

          </div>
          <img src="/seller.jpg" alt="" />

        </div>
      </section>

    </div>
  )
}

export default BecomeSeller