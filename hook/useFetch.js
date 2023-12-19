import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const options = {
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      headers: {
        'X-RapidAPI-Key': '74c054f339msh11a775f1eb080bep1c58b6jsn51b25f953338',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
      params: {...query}
    };
    console.log(options);
    try {
      const response = await axios.request(options);

      setData(response.data.data);
    } catch (e) {
      setError(error);
      alert(`Виникла помилка, будь ласка, спробуйте пізніше!, ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export default useFetch;
