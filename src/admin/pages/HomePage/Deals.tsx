import { Button } from "@mui/material";
import React, { useState } from "react";
import DealTable from "./DealTable";
import DealCategoryTable from "./DealCategoryTable";
import CreateDealForm from "./CreateDealForm";

const tab = [
    { name: "Deals" },
    { name: "Categories" },
    { name: "Create Deal" }
]

const Deals = () => {
  const [activeTab, setActiveTab] = useState(tab[0].name);
  const handleActiveTab = (item: any) => {
        setActiveTab(item.name);
    }
  return (
    <div>
      <div className="flex gap-4">
        {tab.map((item) => (
          <Button
            onClick={() => handleActiveTab(item)}
            variant={activeTab === item.name ? "contained" : "outlined"}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="mt-5">
        {activeTab === "Deals" ? (
          <DealTable />
        ) : activeTab === "Categories" ? (
          <DealCategoryTable />
        ) : (
          <div className="mt-5 border-t flex flex-col justify-center items-center h-[70vh]">
            <CreateDealForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
