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
      const products = res.products;
      const listProduct = [];
      products.forEach((product) => {
        listProduct.push({
          id: product.id,
          productName: product.productName,
          productQuatity: product.productQuatity,
          productImage: product.productImage ? (
            <img
              src={product.productImage}
              className="w-[40px] h-[40px] object-cover"
            />
          ) : (
            ""
          ),
        });
      });
      setProducts(listProduct);
    });
  }, []);

  return (
    <div>
      <StaticBar />
      <NavBar
        activeTab="product"
        onTabClick={handleTabClick}
        onAddProduct={handleCreate}
      />
      <div className="px-6">
        <Table
          datas={products}
          tableName="Products"
          columnNames={columnNames}
        />
      </div>
      {isCreate && <Popup setDisplay={setIsCreate} setLoading={setLoading} />}
    </div>
  );
}
