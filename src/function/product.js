const axios = require('axios');
const config = require("../config.json");

const insertProduct = async (name, productId, description="", imgUrl="") => {
    try {
        const path = config.backend + "/insert-product";
        const res = await axios.post(path, {
            "rfidId": productId,
            "productName": name,
            "productDescription": description,
            "productImage": imgUrl
        });
        return Promise.resolve(res.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    insertProduct
}