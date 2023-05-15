import React from "react";
import Button from "@mui/material/Button";

function NavBar() {
  return (
    <div>
      <div className="p-5">
        <div className="bg-white p-5 rounded-lg shadow-xl mt-10">
          <div className="flex justify-between">
            <div className="w-1/2">
              <p className="ml-5 font-medium text-sm text-[#E19133]">
                Total Products
              </p>
              <p className="ml-5 font-medium text-sm text-[#5D6679]">99999</p>
            </div>
            <div className="mr-5 w-1/2 flex justify-end">
              <Button variant="contained" className="bg-[#1366D9]">
                + Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
