import { Button, IconButton, Menu } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "./svg/SearchIconSvg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableHeader from "./TableHeader";
import Penedit from "../public/svgs/Penedit";
import BinDel from "../public/svgs/BinDel";
import { handleRequest } from "../../commom/request";
import Swal from "sweetalert2";
const config = require("../../src/config.json");
import PopupEdit from "./PopupEdit";

export default function Table({
  datas = [],
  tableName = "",
  columnNames = [],
  setLoading = (loading) => {},
  isCanEditClick = false,
  keySearch = [],
  className = ""
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productId, setProductId] = useState("");
  const [displayEdit, setDisplayEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [mode, setMode] = useState("read");
  const open = Boolean(anchorEl);

  const [page, setPage] = useState(1);
  const [dataDisplay, setDataDisplay] = useState(datas);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setProductId(id);
  };

  const handleFilter = (e) => {
    const key = keySearch;
    const searchKey = e.target.value.toLowerCase().replace(" ", "").split(",");
    if (searchKey.length == 1 && searchKey[0] == "") {
      setDataDisplay(datas);
      return;
    }
    const newData = datas.filter((data) => {
      let countMatch = 0;
      for (let j = 0; j < searchKey.length; j++) {
        for (let i = 0; i < key.length; i++) {
          if (
            data[key[i]]
              .toString()
              .trim()
              .toLowerCase()
              .includes(searchKey[j].trim())
          ) {
            countMatch++;
            break;
          }
        }
      }
      if (countMatch == searchKey.length) {
        return true;
      }
      return false;
    });
    setDataDisplay(newData);
  };

  useEffect(() => {
    setDataDisplay(datas);
  }, [datas]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = async () => {
    try {
      setLoading(true);
      const response = await handleRequest({
        path: config.backend + `/delete-product/${productId}`,
        method: "delete",
      });
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message,
      });
      await window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    }
  };

  const handleEdit = () => {
    const data = datas.filter((d) => d.id == productId)[0];
    editClick(data, "edit", "edit");
  };

  const editClick = (data, label, mode = "read") => {
    if (!label || !isCanEditClick) {
      return;
    }
    setDisplayEdit(true);
    setDataEdit(data);
    setMode(mode);
  };

  return (
    <>
      {displayEdit && (
        <PopupEdit
          setDisplay={setDisplayEdit}
          setLoading={setLoading}
          data={dataEdit}
          isEdit={mode == "edit"}
        />
      )}
      <div className={`p-7 text-[#48505E] bg-white rounded-br-xl rounded-bl-xl ${className}`}>
        <div className="flex justify-between ">
          <div className="text-[#383E49] text-lg tablet:text-xl font-medium	">
            {tableName}
          </div>
          {keySearch.length > 0 && (
            <div className="tablet:mr-6 flex border border-[#1366D9] items-center p-2 rounded gap-2 h-fit">
              <SearchIcon />
              <input
                placeholder="search product"
                className=" placeholder-[#1366D9] text-[#1366D9] text-xs tablet:text-sm"
                onChange={handleFilter}
              />
            </div>
          )}
        </div>
        <TableHeader columnNames={columnNames} />
        <table className="w-full">
          <tbody className="flex flex-col justify-center">
            {dataDisplay.map((data, index) => {
              if (index >= (page - 1) * 10 && index < page * 10) {
                return (
                  <tr
                    className="grid grid-cols-5 gap-2 py-4 border-b border-gray-300 "
                    key={index}
                  >
                    {columnNames.map((label, index) => (
                      <td
                        key={index}
                        onClick={() => editClick(data, label.key)}
                      >
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
                              id={data.id}
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={(event) => handleClick(event, data.id)}
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
                                className="border border-gray-300  py-[5px] flex flex-col w-[96px] rounded-md	text-[#667085]"
                              >
                                <div class="flex flex-col w-[94px] ">
                                  <div
                                    className="flex items-center gap-2 p-2 bg-white hover:bg-[#E5E5E5] cursor-pointer"
                                    onClick={handleEdit}
                                  >
                                    <p class="pl-1 ">
                                      <Penedit />{" "}
                                    </p>{" "}
                                    <p>Edit </p>
                                  </div>
                                  <div
                                    className="flex items-center gap-2 p-2 bg-white hover:bg-[#E5E5E5] cursor-pointer"
                                    onClick={handleClickDelete}
                                  >
                                    <p class="pl-1">
                                      <BinDel />
                                    </p>{" "}
                                    <p class="pb-[1px]">Delete</p>
                                  </div>
                                </div>
                              </div>
                            </Menu>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        {dataDisplay.length > 10 && (
          <div className="mt-9 w-full flex justify-between items-center text-[#48505E]">
            {page > 1 ? (
              <Button
                variant="outlined"
                className="text-[#48505E] border-[#D0D3D9]"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            <p>
              Page {page} of {Math.round(dataDisplay.length / 10)}
            </p>
            {page < Math.round(dataDisplay.length / 10) ? (
              <Button
                variant="outlined"
                className="text-[#48505E] border-[#D0D3D9]"
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
