import { useEffect, useRef, useState } from "react";
import NoImageSvg from "./svg/noImageSvg";
import AOS from "aos";
import "aos/dist/aos.css";
import { uploadImage } from "../function/uploader";
import Swal from "sweetalert2";
import { insertProduct } from "../function/product";

export default function Popup({ setDisplay, setLoading }) {
  const imageRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    AOS.init();
  }, []);

  const actionAddProduct = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const name = e.target.name.value;
      const id = e.target.id.value;
      const description = e.target.description.value;
      const img = imgUrl;
      const response = await insertProduct(name, id, description, img);
      setLoading(false);
      setDisplay(false);
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.message,
      });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    }
  };

  const actionUploadImage = async (e) => {
    try {
      setImgUrl("uploading");
      const image = e.target.files[0];
      const { url } = await uploadImage(image);
      setImgUrl(url);
    } catch (error) {
      setImgUrl("");
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    }
  };

  const onClickUploadImage = () => {
    imageRef.current.click();
  };

  const onDiscard = () => {
    setDisplay(false);
  };

  return (
    <div
      className={`fixed bg-[#6E707560] w-full h-full z-0 top-0 left-0 flex justify-center items-center px-2`}
    >
      <div
        className="bg-white h-fit p-[30px] rounded-lg font-medium w-[500px]"
        data-aos="zoom-in"
      >
        <div className="mb-[30px] text-[#383E49] font-medium text-xl">
          New Product
        </div>
        {imgUrl === "uploading" && (
          <div className="flex flex-col items-center mb-[24px] opacity-70">
            <img
              src="/loading.gif"
              className="w-[60px] h-[60px] cursor-pointer rounded-lg object-cover"
            />
          </div>
        )}

        {imgUrl !== "uploading" && (
          <div
            onSubmit={actionUploadImage}
            className={`flex flex-col items-center mb-[24px]`}
          >
            {imgUrl ? (
              <img
                src={imgUrl}
                className="w-[90px] h-[90px] cursor-pointer rounded-lg object-cover"
                onClick={onClickUploadImage}
              />
            ) : (
              <NoImageSvg
                className="cursor-pointer"
                onClick={onClickUploadImage}
              />
            )}
            <div
              className="text-[#448DF2] text-[13px] mt-[8px] cursor-pointer"
              onClick={onClickUploadImage}
            >
              Browse Image
            </div>
            <input
              type="file"
              name="image"
              ref={imageRef}
              className="hidden"
              accept="image/*"
              onChange={actionUploadImage}
            />
          </div>
        )}

        <form onSubmit={actionAddProduct}>
          <div className="text-[16px] text-[#383E49]">Product Name</div>
          <input
            className="mt-[6px] px-[14px] py-[10px] text-[16px] border-[#D0D5DD] border-[1px] w-full rounded-lg"
            placeholder="Enter product name"
            name="name"
            required
          />

          <div className="mt-[20px] text-[16px] text-[#383E49]">Product ID</div>
          <input
            className="mt-[6px] px-[14px] py-[10px] text-[16px] border-[#D0D5DD] border-[1px] w-full rounded-lg"
            placeholder="Enter product ID"
            name="id"
            required
          />

          <div className="mt-[20px] text-[16px] text-[#383E49]">
            Description
          </div>
          <input
            className="mt-[6px] px-[14px] py-[10px] text-[16px] border-[#D0D5DD] border-[1px] w-full rounded-lg"
            placeholder="Enter description"
            name="description"
          />

          <div className="mt-[40px] flex justify-end gap-[10px]">
            <div
              className="text-[#858D9D] text-[15px] border-[#D0D5DD] border-[1px] rounded-lg w-fit px-[14px] py-[8px] cursor-pointer"
              onClick={onDiscard}
            >
              Discard
            </div>
            <button
              type="submit"
              className="text-white text-[15px] bg-[#1366D9] hover:bg-[#1366D0F0] border-[1px] rounded-lg w-fit px-[14px] py-[8px] cursor-pointer"
            >
              + Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
