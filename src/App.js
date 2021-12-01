import React, { useState, useEffect } from "react";
import { render } from "react-dom";
// import useFetch from "./hooks/useFetch";
import './style.css';

const postsIds = [1, 2, 3, 4, 5, 6, 7, 8];

const fetchPost = async (id) => {
    const apiCall = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const response = await apiCall.json();

    return response;
}

const App = () => {
    const [index, setIndex] = useState(0);
    // const { loading, data: post, error } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postsIds[index]}`);

    const [loading, setLoading] = useState(true); // PENDIENTE
    const [error, setError] = useState(null); // SI NO LLEGA
    const [post, setPost] = useState(null); // SI LLEGA


    useEffect(() => {
        setLoading(true);
        fetchPost(postsIds[index]).then(res => {
            setLoading(false);
            setError(null);
            setPost(res);
        }).catch(err => {
            setLoading(false);
            setError(err);
        })

    }, [index]);

    const incrementIndex = () => {
        setIndex((i) => {
            return i === postsIds.length - 1 ? i : i + 1;
        });
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return 
        <>
            <p>{error}</p>
            <button onClick={incrementIndex}>Siguiente post</button>
        </>
    }

    return <div>
        {index === postsIds.length - 1 ? <p>No more posts</p> : <>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            <button onClick={incrementIndex}>Next post</button>
        </>}
    </div>;
}






render(React.createElement(App), document.getElementById('root'));