import { useEffect, useState } from "react";
import Table from "../components/Table";
import { handleRequest } from "../../commom/request";
const columnNames = [
  { key: "productImage", title: "Image" },
  { key: "id", title: "ProductId" },
  { key: "productName", title: "Name" },
  { key: "productQuatity", title: "Quantity" },
  { key: false, title: "More" },
];
const datas = [
  { img: "i2", id: "2", name: "baba", qty: "20" },
  { img: "i3", id: "3", name: "nana", qty: "30" },
  { img: "i4", id: "4", name: "haha", qty: "40" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    handleRequest({
      path: "https://backend.ome-let.online/products?getAll=true",
      method: "get",
    }).then((res) => setProducts(res.products));
  }, []);

  console.log(products);

  return (
    <div className="p-[50px]">
      <Table datas={products} tableName="Products" columnNames={columnNames} />
    </div>
  );
}
