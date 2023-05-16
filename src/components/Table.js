import { Button, IconButton, Tooltip } from "@mui/material";
import React from "react";
import SearchIcon from "./svg/SearchIconSvg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableHeader from "./TableHeader";

export default function Table({
  datas = [],
  tableName = "",
  columnNames = [],
}) {
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
                      <Tooltip title="more">
                        <IconButton>
                          <MoreVertIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
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
