
import ProfileFieldCard from '../../../component/ProfileFieldCard';
import { Divider } from '@mui/material';
import { useAppSelector } from '../../../State/Store';

const AdminAccount = () => {
  const {auth} = useAppSelector(store=>store);
  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        <div className="flex items-center pb-3">
          <h1 className="text-2xl font-bold text-gray-600">
            Persional Details
          </h1>
        </div>

        <div className="">
          <ProfileFieldCard keys="Name" value={auth.user?.fullName || ""} />
          <Divider />
          <ProfileFieldCard keys="Email" value={auth.user?.email || ""}/>
          <Divider />
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;