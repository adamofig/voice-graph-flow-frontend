'use client';

import { useEffect, useState } from "react";

export default function EffectPage() {

    const [data, setData] = useState([]);


    useEffect(() => {
        console.log('Effect Page');

        fetch('http://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            {data.map((item: any) => (
                <p key={item.id}>{item.title}</p>
            ))}
            <h1>Effect Page</h1>
        </div>
    )
}
