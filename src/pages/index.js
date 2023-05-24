import StaticBar from "../components/StaticBar";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { handleRequest } from "../../commom/request";
import Popup from "../components/Popup";
import { useRouter } from "next/router";

export default function Home({ setLoading }) {
  const router = useRouter();
  const [isCreate, setIsCreate] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const handleTabClick = () => {
    router.push("/history");
  };

  const handleCreate = () => {
    setIsCreate(true);
  };

  const columnNames = [
    { key: "productImage", title: "Image" },
    { key: "id", title: "ProductId" },
    { key: "productName", title: "Name" },
    { key: "productQuatity", title: "Quantity" },
    { key: false, title: "More" },
  ];

  useEffect(() => {
    handleRequest({
      path: "https://backend.ome-let.online/products?getAll=true",
      method: "get",
    }).then((res) => {
      setProducts(res.products);
    });
  }, []);

  return (
    <div>
      <StaticBar />
      <NavBar
        activeTab="product"
        onTabClick={handleTabClick}
        onAddProduct={handleCreate}
        totalProducts={totalProducts}
      />
      <div className="px-2 tablet:px-4">
        <Table
          datas={products}
          tableName="Products"
          columnNames={columnNames}
          setLoading={setLoading}
        />
      </div>
      {isCreate && <Popup setDisplay={setIsCreate} setLoading={setLoading} />}
    </div>
  );
}
