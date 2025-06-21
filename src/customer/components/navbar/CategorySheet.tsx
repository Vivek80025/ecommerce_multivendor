
import { menLevelTwo } from '../../../Data/category/level two/menLevelTwo'
import { womenLevelTwo } from '../../../Data/category/level two/womenLevelTwo'
import { furnitureLevelTwo } from '../../../Data/category/level two/furnitureLevleTwo'
import { electronicsLevelTwo } from '../../../Data/category/level two/electronicsLavelTwo'
import { menLevelThree } from '../../../Data/category/level three/menLevelThree'
import { womenLevelThree } from '../../../Data/category/level three/womenLevelThree'
import { furnitureLevelThree } from '../../../Data/category/level three/furnitureLevelThree'
import { electronicsLevelThree } from '../../../Data/category/level three/electronicsLevelThree'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const categoryThree:{[key: string]: any[]} = {
  men:menLevelThree,
  women:womenLevelThree,
  home_furniture:furnitureLevelThree,
  electronics:electronicsLevelThree,
}

const categoryTwo:{[key: string]: any[]} ={
  men:menLevelTwo,
  women:womenLevelTwo,
  home_furniture:furnitureLevelTwo,
  electronics:electronicsLevelTwo,
}

const CategorySheet = ({selectedCategory}:any) => {
  const navigate = useNavigate();
  //flex-wrap:-if the children don't fit in a row, they wrap onto the next line
  const childCategory = (category:any,parentCategoryId:any) => {
    return category.filter((child:any) => child.parentCategoryId==parentCategoryId)
  }
  return (
    <Box className="bg-white shadow-lg lg:h-[500px] overflow-y-auto">

      <div className='text-sm flex flex-wrap'>

        {
          categoryTwo[selectedCategory].map((item:any,index)=><div key={item.name} className={`p-8 lg:w-[20%] ${index%2==0 ? "bg-slate-50" : "bg-white"}`} >
            <p className='text-primary-color font-semibold mb-5'>{item.name}</p>

            <ul className='space-y-3'>

              {childCategory(categoryThree[selectedCategory],item.categoryId).map((item:any)=><div key={item.name}>
                <li onClick={()=>navigate("/products/"+item.categoryId)} className='hover:text-primary-color cursor-pointer'>{item.name}</li>
              </div>)}

            </ul>
          </div>)
        }

      </div>

    </Box>
  )
}

export default CategorySheet