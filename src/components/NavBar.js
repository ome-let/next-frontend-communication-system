import React from "react";
import Button from "@mui/material/Button";
import InventoryIcon from "@mui/icons-material/InventoryOutlined";
import HistoryIcon from "@mui/icons-material/History";

function NavBar({ activeTab, onTabClick, onAddProduct }) {
  const handleTabClick = (tab) => {
    onTabClick(tab);
  };

  return (
    <div>
      <div className="px-2 pt-4 tablet:pt-6 tablet:px-4">
        <div className="flex justify-center gap-4 tablet:gap-6">
          <div
            className={`w-1/2 h-12 rounded-t-lg ${
              activeTab === "product"
                ? "bg-white"
                : "bg-[#1366D933] hover:bg-[#E5E5E5]"
            } flex items-center justify-center  cursor-pointer transition-colors duration-300`}
            onClick={() => handleTabClick("product")}
          >
            <InventoryIcon
              className={`${
                activeTab === "product" ? "text-black" : "text-[#1F222ACC]"
              } mr-2  font-medium text-sm`}
            />
            <span
              className={`${
                activeTab === "product" ? "text-black" : "text-[#1F222ACC]"
              } font-medium text-sm`}
            >
              Product
            </span>
          </div>
          <div
            className={`w-1/2 h-12 rounded-t-lg ${
              activeTab === "history"
                ? "bg-white"
                : "bg-[#1366D933] hover:bg-[#E5E5E5]"
            } flex items-center justify-center cursor-pointer transition-colors duration-300`}
            onClick={() => handleTabClick("history")}
          >
            <HistoryIcon
              className={`${
                activeTab === "history" ? "text-black" : "text-[#1F222ACC]"
              } mr-2  font-medium text-sm`}
            />
            <span
              className={`${
                activeTab === "history" ? "text-black" : "text-[#1F222ACC]"
              } font-medium text-sm`}
            >
              History
            </span>
          </div>
        </div>
      </div>

      {activeTab === "product" && (
        <div className="px-2 tablet:px-4">
          <div className="bg-white p-4 shadow-xl tablet:p-6 ">
            <div className="flex justify-between">
              <div className="w-1/2">
                <p className="ml-5 font-medium text-sm tablet:text-base text-[#E19133]">
                  Total Products
                </p>
                <p className="ml-5 font-medium text-sm tablet:text-base text-[#5D6679]">
                  99999
                </p>
              </div>
              <div className="mr-5 w-1/2 flex justify-end">
                <Button
                  variant="contained"
                  size="small"
                  className="bg-[#1366D9]"
                  onClick={onAddProduct}
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
