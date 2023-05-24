import React, { useEffect, useState } from "react";
import StaticBar from "../components/StaticBar";
import NavBar from "../components/NavBar";
import { useRouter } from "next/router";
import Table from "../components/Table";
import { handleRequest } from "../../commom/request";
const config = require("../../src/config.json");

export default function History({ setLoading }) {
  const router = useRouter();
  const handleTabClick = () => {
    router.push("/");
  };

  const [productHistory, setProductHistory] = useState([]);
  const columnNames = [
    { key: "productImage", title: "Image" },
    { key: "productId", title: "ProductId" },
    { key: "productName", title: "Name" },
    { key: "dateTime", title: "Date" },
    { key: "status", title: "Status" },
  ];

  useEffect(() => {
    handleRequest({
      path: config.backend + "/products-history?getAll=true&filter=dateTime",
      method: "get",
    }).then((res) => {
      let historyArray = res.productHistory
      historyArray = historyArray.map(history=>{
        let status 
        if(history.status =="IN_STOCK"){
          status = (
            <p className="text-[#4CA467]">IN</p>
          )
        }
        else{
          status = (
            <p className="text-[#CA4A3C]">Out</p>
          )
        }
        return{
          ...history,
          status,
          statusString: history.status
        }
      })
      setProductHistory(historyArray)
    });
  }, []);
  return (
    <div>
      <StaticBar />
      <NavBar activeTab="history" onTabClick={handleTabClick} />
      <div className="px-2 tablet:px-4">
        <Table
          datas={productHistory}
          tableName="History of Products"
          columnNames={columnNames}
          keySearch={["productId", "productName", "statusString"]}
        />
      </div>
    </div>
  );
}
