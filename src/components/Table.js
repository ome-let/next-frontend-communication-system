import { Button, IconButton, Menu } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "./svg/SearchIconSvg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableHeader from "./TableHeader";
import Penedit from "../public/svgs/Penedit";
import BinDel from "../public/svgs/BinDel";
import PopupEdit from "./PopupEdit";

export default function Table({
  datas = [],
  tableName = "",
  columnNames = [],
  setLoading = () => { },
  isCanEditClick = false
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productId, setProductId] = useState(false)
  const [displayEdit, setDisplayEdit] = useState(false)
  const [dataEdit, setDataEdit] = useState(null)
  const [mode, setMode] = useState("read")
  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setProductId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    const data = datas.filter((d) => d.id == productId)[0]
    editClick(data, "edit", "edit")
  }

  const editClick = (data, label, mode="read") => {
    console.log(data, label);
    if (!label || !isCanEditClick) {
      return
    }
    setDisplayEdit(true)
    setDataEdit(data)
    setMode(mode)
  }

  return (
    <>
      {
        displayEdit && <PopupEdit setDisplay={setDisplayEdit} setLoading={setLoading} data={dataEdit} isEdit={mode == "edit"} />
      }
      <div className="p-7 text-[#48505E] bg-white rounded-br-xl rounded-bl-xl	">
        <div className="flex justify-between ">
          <div className="text-[#383E49] text-lg tablet:text-xl font-medium	">
            {tableName}
          </div>
          <div className="tablet:mr-6 flex border border-[#1366D9] items-center p-2 rounded gap-2 h-fit">
            <SearchIcon />
            <input
              placeholder="search product"
              className=" placeholder-[#1366D9] text-[#1366D9] text-xs tablet:text-sm"
            />
          </div>
        </div>
        <TableHeader columnNames={columnNames} />
        <table className="w-full">
          <tbody className="flex flex-col justify-center">
            {datas.map((data, indexProduct) => (
              <tr
                className="grid grid-cols-5 gap-2 py-4 border-b border-gray-300 "
                key={indexProduct}
              >
                {columnNames.map((label, index) => (
                  <td key={index} onClick={() => editClick(data, label.key)}>
                    {label.key === "productImage" ? (
                      <img
                        src={data[label.key]}
                        className="w-[40px] h-[40px] object-cover"
                      />
                    ) : label.key ? (
                      <div className="text-xs tablet:text-sm  whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {data[label.key]}
                      </div>
                    ) : (
                      <div>
                        <IconButton
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => handleClick(e, data.id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                        <Menu
                          className="border-none shadow-none"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          <div
                            onClick={handleClose}
                            className="border border-gray-300  py-[5px] flex flex-col w-[96px] "
                          >
                            <div class="flex flex-col w-[94px] ">
                              <div className="flex items-center gap-2 p-2 bg-white hover:bg-[#E5E5E5] cursor-pointer"
                                onClick={handleEdit}>
                                <p class="pl-1 ">
                                  <Penedit />{" "}
                                </p>{" "}
                                <p>Edit </p>
                              </div>
                              <div className="flex items-center gap-2 p-2 bg-white hover:bg-[#E5E5E5] cursor-pointer">
                                <p class="pl-1">
                                  <BinDel />
                                </p>{" "}
                                <p class="pb-[1px]">Delete </p>
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
    </>
  );
}
