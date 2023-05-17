import { Button, IconButton, Menu } from "@mui/material";
import React from "react";
import SearchIcon from "./svg/SearchIconSvg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableHeader from "./TableHeader";
import Penedit from '../public/svgs/Penedit'
import BinDel from '../public/svgs/BinDel'

export default function Table({
  datas = [],
  tableName = "",
  columnNames = [],
}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="p-5 text-[#48505E] bg-white rounded-xl	">
      <div className="flex justify-between">
        <div className="text-[#383E49] text-xl font-medium	">{tableName}</div>
        <div className="flex border border-[#1366D9] items-center p-2 rounded gap-2">
          <SearchIcon />
          <input placeholder="search product" style={{ color: "#1366D9" }} />
        </div>
      </div>
      <TableHeader columnNames={columnNames} />
      <table className="w-full">
        <tbody className="flex flex-col justify-center">
          {datas.map((data, index) => (
            <tr className="grid grid-cols-5 py-4 border-b border-gray-300" key={index}>
              {columnNames.map((label, index) => (
                <td key={index}>
                  {label.key ? (
                    data[label.key]
                  ) : (
                    <div>
                      <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <MoreVertIcon fontSize="inherit" />
                      </IconButton>
                      <Menu className="border-none shadow-none"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                      >
                        <div onClick={handleClose} className="border border-gray-300  py-[5px] flex flex-col w-[96px] ">
                            <div class="flex flex-col w-[94px] ">
                              <div className='flex items-center gap-2 p-2 bg-white hover:bg-[#E5E5E5] cursor-pointer'>
                                <p class="pl-1 "><Penedit /> </p> <p>Edit </p>
                              </div>
                              <div className='flex items-center gap-2 p-2 bg-white hover:bg-[#E5E5E5] cursor-pointer'>
                                <p class="pl-1"><BinDel /></p> <p class='pb-[1px]'>Delete </p>
                              </div>
                            </div>
                        </div>
                      </Menu>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {datas.length > 10 && (
        <div className="mt-9 w-full flex justify-between items-center text-[#48505E]">
          <Button
            variant="outlined"
            className="text-[#48505E] border-[#D0D3D9]"
          >
            Previous
          </Button>
          <p>Page 1 of 10</p>
          <Button
            variant="outlined"
            className="text-[#48505E] border-[#D0D3D9]"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
