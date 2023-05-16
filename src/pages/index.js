import StaticBar from "../components/StaticBar";
import NavBar from "../components/NavBar";

export default function Home() {
  const handleTabClick = (tab) => {
    console.log("Tab clicked:", tab);
  };

  return (
    <h1 className="text-3xl font-bold text-orange-600">
      <StaticBar />
      <NavBar activeTab="product" onTabClick={handleTabClick} />
      {/* Hello world!
      <Button variant="contained" className='bg-black'>Contained</Button> */}
    </h1>
  );
}
