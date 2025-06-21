import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../State/Store";

const ElectronicTable = () => {
  const {home} = useAppSelector(store=>store);
  return (
    <div>
      <HomeCategoryTable data={home.homePageData?.electricCategories || []}/>
    </div>
  );
};

export default ElectronicTable;
