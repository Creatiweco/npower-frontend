import axios from "axios";

const API_BASE_URL = "https://npowersitecms-production.up.railway.app/api"; 
const API_TOKEN = process.env.REACT_APP_STRAPI_API_TOKEN; 

export const submitForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/form-submissions`, 
      { data: formData },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Form gönderme hatası:", error);
    throw error;
  }
};
