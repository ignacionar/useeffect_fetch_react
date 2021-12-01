import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [loading, setLoading] = useState(true); // PENDIENTE
    const [error, setError] = useState(null); // SI NO LLEGA
    const [data, setData] = useState(null); // SI LLEGA

    useEffect(() => { // NO USAR ASYNC ADENTRO!
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setLoading(false);
            setError(null);
            setData(data);
        })
        .catch(err => {
            setLoading(false);    
            setError(err);
        });

    }, [url]);

    return {
        loading,
        error,
        data,
    };
    
};

export default useFetch;