import { useEffect, useRef, useState } from "react";
import NoImageSvg from "./svg/noImageSvg";
import AOS from "aos";
import "aos/dist/aos.css";
import { uploadImage } from "../function/uploader";
import Swal from "sweetalert2";
import { updateProduct } from "../function/product";
import Penedit from "../public/svgs/Penedit";
import IconSaveSvg from "./svg/IconSaveSvg";

export default function PopupEdit({ setDisplay, setLoading, data, isEdit = false }) {
    const imageRef = useRef(null);
    const [imgUrl, setImgUrl] = useState(data.productImage);
    const [mode, setMode] = useState(isEdit == true ? "edit" : "read");

    useEffect(() => {
        AOS.init();
    }, []);

    const actionEditProduct = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const name = e.target.name.value;
            const description = e.target.description.value;
            const id = e.target.id.value; 
            const img = imgUrl;
            const response = await updateProduct(id, name, description, img);
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
        if (mode == "read") {
            return
        }
        imageRef.current.click();
    };

    const onDiscard = () => {
        setDisplay(false);
    };

    const changeToEditMode = () => {
        setMode("edit")
    }

    return (
        <div
            className={`fixed bg-[#6E707560] w-full h-full z-30 top-0 left-0 flex justify-center items-center px-2`}
        >
            <div
                className="bg-white h-fit p-[30px] rounded-lg font-medium w-[500px]"
                data-aos="zoom-in"
            >
                <div className="mb-[30px] text-[#383E49] font-medium text-xl">
                {
                    mode == "read" ? "Product Detail" : "Edit Product"
                }
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
                        {
                            mode == "edit" &&
                            <div
                                className="text-[#448DF2] text-[13px] mt-[8px] cursor-pointer"
                                onClick={onClickUploadImage}
                            >
                                Browse Image
                            </div>
                        }
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

                <form onSubmit={actionEditProduct}>
                    <div className="text-[16px] text-[#383E49]">Product Name</div>
                    <input
                        className={`mt-[6px] px-[14px] py-[10px] text-[16px] border-[#D0D5DD] border-[1px] w-full rounded-lg ${mode == "read" && "text-gray-400 bg-[#D0D5DD]"}`}
                        placeholder="Enter product name"
                        name="name"
                        defaultValue={data.productName}
                        readOnly={mode == "read"}
                        required
                    />

                    <div className="mt-[20px] text-[16px] text-[#383E49]">Product ID</div>
                    <input
                        className="mt-[6px] px-[14px] py-[10px] text-[16px] border-[#D0D5DD] border-[1px] w-full rounded-lg text-gray-400 bg-[#D0D5DD]"
                        placeholder="Enter product ID"
                        name="id"
                        defaultValue={data.id}
                        readOnly
                        required
                    />

                    <div className="mt-[20px] text-[16px] text-[#383E49]">
                        Description
                    </div>
                    <input
                        className={`mt-[6px] px-[14px] py-[10px] text-[16px] border-[#D0D5DD] border-[1px] w-full rounded-lg ${mode == "read" && "text-gray-400 bg-[#D0D5DD]"}`}
                        placeholder="Enter description"
                        name="description"
                        defaultValue={data.productDescription}
                        readOnly={mode == "read"}
                    />

                    <div className="mt-[40px] flex justify-end gap-[10px]">
                        <div
                            className="text-[#858D9D] text-[15px] border-[#D0D5DD] border-[1px] rounded-lg w-fit px-[14px] py-[8px] cursor-pointer"
                            onClick={onDiscard}
                        >
                            <p>Discard</p>
                        </div>
                        {
                            mode == "edit" ?
                                (
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 text-white text-[15px] bg-[#1366D9] hover:bg-[#1366D0F0] border-[1px] rounded-lg w-fit px-[14px] py-[8px] cursor-pointer"
                                    >
                                        <IconSaveSvg/>Save
                                    </button>
                                ) : (
                                    <div
                                        onClick={changeToEditMode}
                                        className="flex items-center gap-2  text-white text-[15px] bg-[#1366D9] hover:bg-[#1366D0F0] border-[1px] rounded-lg w-fit px-[14px] py-[8px] cursor-pointer"
                                    >
                                        <Penedit className="fill-white" /><p>Edit Product</p>
                                    </div>
                                )
                        }

                    </div>
                </form>
            </div>
        </div>
    );
}
