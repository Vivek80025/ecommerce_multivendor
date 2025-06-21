
import { Route, Routes } from 'react-router-dom'
import SellersTable from '../admin/pages/Sellers/SellersTable'
import Coupon from '../admin/pages/Coupon/Coupon'
import AddNewCouponForm from '../admin/pages/Coupon/AddNewCouponForm'
import GridTable from '../admin/pages/HomePage/GridTable'
import ElectronicTable from '../admin/pages/HomePage/ElectronicTable'
import ShopByCategoryTable from '../admin/pages/HomePage/ShopByCategoryTable'
import Deals from '../admin/pages/HomePage/Deals'
import AdminAccount from '../admin/pages/AdminAccount/AdminAccount'

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SellersTable />} />
        <Route path='/coupon' element={<Coupon />} />
        <Route path='/add-coupon' element={<AddNewCouponForm />} />
        <Route path='/home-grid' element={<GridTable />} />
        <Route path='/electronics-category' element={<ElectronicTable />} />
        <Route path='/shop-by-category' element={<ShopByCategoryTable />} />
        <Route path='/deals' element={<Deals />} />
        <Route path='/account' element={<AdminAccount />} />
      </Routes>
    </div>
  )
}

export default AdminRoutes