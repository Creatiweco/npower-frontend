import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

function useFetch(endpoint, baseUrl = process.env.REACT_APP_API_BASE_URL) {
  const { i18n } = useTranslation();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = process.env.REACT_APP_API_URL;
  const token = process.env.REACT_APP_API_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const localizedEndpoint = endpoint.includes("locale=")
          ? endpoint
          : `${endpoint}${endpoint.includes("?") ? "&" : "?"}locale=${i18n.language}`;

        const response = await axios.get(`${baseUrl}${localizedEndpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, baseUrl, i18n.language, token]);

  return { data, loading, error, api };
}

export default useFetch;
