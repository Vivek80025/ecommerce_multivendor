
import ShopByCategoryCard from './ShopByCategoryCard'
import { useAppSelector } from '../../../../State/Store'

const ShopByCategory = () => {
  const {home} = useAppSelector(store=>store)
  return (
    <div className='flex flex-wrap justify-between lg:px-20 gap-5'>
      {home.homePageData?.shopByCategories.map((item,index)=><ShopByCategoryCard key={index} item={item}/>)}
    </div>
  )
}

export default ShopByCategory