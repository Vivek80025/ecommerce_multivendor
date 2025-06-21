import React, { useEffect, useState } from 'react'
import AdminDrawerList from '../components/AdminDrawerList'
import AdminRoutes from '../../Routes/AdminRoutes'
import { Alert, Snackbar } from '@mui/material';
import { useAppSelector } from '../../State/Store';

const AdminDashboard = () => {
  const toggleDrawer = () => {}

  const {deals} = useAppSelector(store=>store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  useEffect(() => {
    if (deals.dealCreated || deals.dealUpdated ||deals.error) {
      setOpenSnackbar(true)
    }
  }, [deals.dealCreated, deals.dealUpdated, deals.error])
  return (
    <div className=''>
      <div className='lg:flex lg:h-[90vh]'>
        {/* block = Makes the element visible */}
        <section className='hidden lg:block h-[full]'>
          <AdminDrawerList toggleDrawer={toggleDrawer} />
        </section>

        <section className='p-10 w-full lg:w-[80%] overflow-y-auto'>
        {/* overflow-y-auto = Add a vertical scrollbar (y axis) only when the content is taller than the container */}
          <AdminRoutes />
        </section> 

      </div>

      <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={snackbarOpen} autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert
                onClose={handleCloseSnackbar}
                severity={deals.error ? "error" : "success"}
                variant="filled"
                sx={{ width: '100%' }}
              >
                {deals.error ? deals.error : deals.dealCreated ? "Deal created successfully" : deals.dealUpdated ? "deal updated successfully": ""}
              </Alert>
            </Snackbar>
    </div>
  )
}

export default AdminDashboard