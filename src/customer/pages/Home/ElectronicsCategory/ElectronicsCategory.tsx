
import ElectronicsCategoryCard from './ElectronicsCategoryCard'
import { useAppSelector } from '../../../../State/Store'
import { useMediaQuery } from '@mui/material';


const ElectronicsCategory = () => {
  const {home} = useAppSelector(store=>store);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  console.log("home-",home)
  return (
    <div  className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
      {home.homePageData?.electricCategories
      .slice(0,isSmallScreen ? 5 : home.homePageData.electricCategories.length)
      .map((item,index)=><ElectronicsCategoryCard key={index} item={item}/>)}
    </div>
  )
}
export default ElectronicsCategory
