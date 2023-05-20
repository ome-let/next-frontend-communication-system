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
    }).then((res) => setProductHistory(res.productHistory));
  }, []);
  return (
    <div>
      <StaticBar />
      <NavBar activeTab="history" onTabClick={handleTabClick} />
      <div className="px-6">
        <Table
          datas={productHistory}
          tableName="History of Products"
          columnNames={columnNames}
        />
      </div>
    </div>
  );
}
