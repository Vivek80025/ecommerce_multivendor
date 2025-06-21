import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../State/Store";
import { logout } from "../State/AuthSlice";

interface menuItem {
  name: string;
  path: string;
  icon: any;
  activeIcon: any;
}

interface DrawerListProps {
  menu: menuItem[];
  menu2: menuItem[];
  toggleDrawer: () => void;
}

const DrawerList = ({ menu, menu2 }: DrawerListProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = ()=>{
    dispatch(logout(navigate))
  }

  const handleClick = (item: any)=>() => {

        if (item.name === "Logout") {
          dispatch(logout(navigate))
        }
        navigate(item.path);
    }
  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full  w-[300px] border-r py-5">
        <div className="space-y-2">
          {menu.map((item, index: number) => (
            <div
              onClick={handleClick(item)}
              className="pr-9 cursor-pointer"
              key={index}
            >
              {/* ListItemIcon is a special container used to hold an icon inside a list item */}
              <span
                className={`${
                  item.path == location.pathname
                    ? "bg-primary-color text-white"
                    : "text-primary-color"
                } flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {item.path == location.pathname ? item.activeIcon : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </span>
            </div>
          ))}
        </div>

        <Divider />

        <div className="space-y-2">
          {menu2.map((item, index: number) => (
            <div
              onClick={() => {
                navigate(item.path)
                if(item.path=='/') handleLogout()
              }}
              className="pr-9 cursor-pointer"
              key={index}
            >
              {/* ListItemIcon is a special container used to hold an icon inside a list item */}
              <span
                className={`${
                  item.path == location.pathname
                    ? "bg-primary-color text-white"
                    : "text-primary-color"
                } flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {item.path == location.pathname ? item.activeIcon : item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
