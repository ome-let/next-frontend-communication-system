import StaticBar from "../components/StaticBar";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { handleRequest } from "../../commom/request";
import Popup from "../components/popup";

export default function Home({setLoading}) {
  const handleTabClick = (tab) => {
    console.log("Tab clicked:", tab);
  };

  const columnNames = [
    { key: "productImage", title: "Image" },
    { key: "id", title: "ProductId" },
    { key: "productName", title: "Name" },
    { key: "productQuatity", title: "Quantity" },
    { key: false, title: "More" },
  ];

  const [products, setProducts] = useState([]);
  useEffect(() => {
    handleRequest({
      path: "https://backend.ome-let.online/products?getAll=true",
      method: "get",
    }).then((res) => setProducts(res.products));
  }, []);

  return (
    <div>
      <StaticBar />
      <NavBar activeTab="product" onTabClick={handleTabClick} />
      {/* Hello world!
      <Button variant="contained" className='bg-black'>Contained</Button> */}
      <div className="p-6">
        <Table
          datas={products}
          tableName="Products"
          columnNames={columnNames}
        />
      </div>
      <Popup show={true} setLoading={setLoading} />
    </div>
  );
}
