import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../State/Store';

const DealCategoryTable = () => {
  const {home} = useAppSelector(store=>store);
  return (
    <div>
      <HomeCategoryTable data={home.homePageData?.dealCategories || []}/>
    </div>
  )
}

export default DealCategoryTable