import { Edit } from '@mui/icons-material'
import { Alert, Avatar, Box, Button, Divider, Modal, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileFildCard from './ProfileFildCard'
import { useAppSelector } from '../../../State/Store'
import PersionalDetailsForm from './PersionalDetailsForm'
import BusinessDetailsForm from './BusinessDetailsForm'
import PickupAddressForm from './PickupAddressForm'
import BankDetailsForm from './BankDetailsForm'

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const { seller } = useAppSelector((store) => store);

  const [open, setOpen] = React.useState(false);
  const [selectedForm, setSelectedForm] = useState("persionalDetails");
  const handleClose = () => setOpen(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleOpen = (formName: string) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersionalDetailsForm onClose={handleClose} />;
      case "businessDetails":
        return <BusinessDetailsForm onClose={handleClose} />;
      case "pickupAddress":
        return <PickupAddressForm onClose={handleClose} />;
      case "bankDetails":
        return <BankDetailsForm onClose={handleClose} />;
      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (seller.profileUpdated || seller.error) {
      setOpenSnackbar(true);
    }
  }, [seller.profileUpdated]);
  return (
    <div className="lg:p-20 space-y-20">
      <div className="w-full lg:w-[70%]  ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Persional Details
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("personalDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <Edit />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src=""
          />
          <div>
            <ProfileFildCard
              keys={"Seller Name"}
              value={seller.profile?.sellerName}
            />
            <Divider />
            <ProfileFildCard
              keys={"Seller Email"}
              value={seller.profile?.email}
            />
            <Divider />
            <ProfileFildCard
              keys={"Seller Mobile"}
              value={seller.profile?.mobile}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Bussiness Details
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("businessDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <Edit />
            </Button>
          </div>
        </div>

        <div className=" ">
          <ProfileFildCard
            keys={"Business Name/Brand Name"}
            value={seller.profile?.businessDetails.businessName}
          />
          <Divider />
          <ProfileFildCard
            keys={"GSTIN"}
            value={seller.profile?.GSTIN || "not provided"}
          />
          <Divider />
          <ProfileFildCard
            keys={"Account Status"}
            value={seller.profile?.accountStatus}
          />
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">Pickup Address</h1>
          <div>
            <Button
              onClick={() => handleOpen("pickupAddress")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <Edit />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileFildCard
              keys={"Adress"}
              value={seller.profile?.pickupAddress.address}
            />
            <Divider />
            <ProfileFildCard
              keys={"City"}
              value={seller.profile?.pickupAddress.city}
            />
            <Divider />
            <ProfileFildCard
              keys={"State"}
              value={seller.profile?.pickupAddress.state}
            />
            <Divider />
            <ProfileFildCard
              keys={"Mobile"}
              value={seller.profile?.pickupAddress.mobile}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">Bank Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("bankDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <Edit />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileFildCard
              keys={"Account Holder Name"}
              value={seller.profile?.bankDetails.accountHolderName}
            />
            <Divider />
            <ProfileFildCard
              keys={"Account Number"}
              value={
                seller.profile?.bankDetails.accountNumber
              }
            />
            <Divider />
            <ProfileFildCard
              keys={"IFSC CODE"}
              value={seller.profile?.bankDetails.ifscCode}
            />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={seller.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {seller.error ? seller.error : "Profile Updated Successfully"}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Profile