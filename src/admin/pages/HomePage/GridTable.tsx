import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppSelector } from "../../../State/Store";

const GridTable = () => {
  const {home} = useAppSelector(store=>store);
  return (
    <div>
      <HomeCategoryTable data={home.homePageData?.grid || []} />
    </div>
  );
};

export default GridTable;
