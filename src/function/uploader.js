const axios = require("axios");
const config = require("../config.json");

const uploadImage = async (file) => {
  try {
    const path = config.backend + "/upload";
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(path, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
    uploadImage
};
