
import SellerDrawerList from '../components/SellerDarwerList/SellerDrawerList'
import SellerRoutes from '../../Routes/SellerRoutes'

const SellerDashbord = () => {
  const toggleDrawer = () => {

  }
  return (
    <div className="">

      <div className='lg:flex lg:h-[90vh]'>
        {/* block = Makes the element visible */}
        <section className='hidden lg:block h-[full]'>
          <SellerDrawerList toggleDrawer={toggleDrawer} />
        </section>

        <section className='p-10 w-full lg:w-[80%] overflow-y-auto'>
        {/* overflow-y-auto = Add a vertical scrollbar (y axis) only when the content is taller than the container */}
          <SellerRoutes/>
        </section> 

      </div>

    </div>
  )
}

export default SellerDashbord