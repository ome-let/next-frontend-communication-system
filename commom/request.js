import axios from "axios";

export const handleRequest = async (args) => {
  const { path, method, headers, data } = args;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios[method](path, data, {
        headers: headers,
      });
      resolve(response.data);
    } catch (error) {
      reject({
        message:
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong",
        context: error.response?.data,
      });
    }
  });
};
