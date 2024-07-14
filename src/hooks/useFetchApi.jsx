import { useState } from 'react'
import { useEffect } from 'react';

const useFetchApi = (url = " ", options = null) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       fetch(url, options) 
       .then((res) => res.json())
       .then((data) => {
        setData(data)
        setLoading(false);
    })
       .catch((error) => console.log(error));
    }, [url, options]);

  return {data , loading};
}

export default useFetchApi