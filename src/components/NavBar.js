import React, { useState } from "react";
import Button from "@mui/material/Button";
import InventoryIcon from "@mui/icons-material/InventoryOutlined";
import HistoryIcon from "@mui/icons-material/History";

function NavBar() {
  const [activeTab, setActiveTab] = useState("product");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="px-4 pt-6">
        <div className="flex justify-center">
          <div
            className={`w-1/2 h-12 rounded-t-lg ${
              activeTab === "product" ? "bg-white" : "bg-[#1366D933]"
            } flex items-center justify-center mx-2 cursor-pointer transition-colors duration-300 ${
              activeTab !== "product" && "hover:bg-[#E5E5E5]"
            }`}
            onClick={() => handleTabClick("product")}
          >
            <InventoryIcon
              className={`${
                activeTab === "product"
                  ? "text-black font-medium text-sm"
                  : "text-[#1F222ACC] font-medium text-sm"
              } mr-2`}
            />
            <span
              className={`${
                activeTab === "product"
                  ? "text-black font-medium text-sm"
                  : "text-[#1F222ACC] font-medium text-sm"
              } font-medium`}
            >
              Product
            </span>
          </div>
          <div
            className={`w-1/2 h-12 rounded-t-lg ${
              activeTab === "history" ? "bg-white" : "bg-[#1366D933]"
            } flex items-center justify-center mx-2 cursor-pointer transition-colors duration-300 ${
              activeTab !== "history" && "hover:bg-[#E5E5E5]"
            }`}
            onClick={() => handleTabClick("history")}
          >
            <HistoryIcon
              className={`${
                activeTab === "history"
                  ? "text-black font-medium text-sm"
                  : "text-[#1F222ACC] font-medium text-sm"
              } mr-2`}
            />
            <span
              className={`${
                activeTab === "history"
                  ? "text-black font-medium text-sm"
                  : "text-[#1F222ACC] font-medium text-sm"
              } font-medium`}
            >
              History
            </span>
          </div>
        </div>
      </div>

      {activeTab === "product" && (
        <div className="px-6">
          <div className="bg-white p-7 shadow-xl">
            <div className="flex justify-between">
              <div className="w-1/2">
                <p className="ml-5 font-medium text-sm text-[#E19133]">
                  Total Products
                </p>
                <p className="ml-5 font-medium text-sm text-[#5D6679]">99999</p>
              </div>
              <div className="mr-5 w-1/2 flex justify-end">
                <Button
                  variant="contained"
                  size="small"
                  className="bg-[#1366D9]"
                >
                  + Add Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
