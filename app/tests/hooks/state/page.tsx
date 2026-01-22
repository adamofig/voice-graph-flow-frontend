'use client';
import { useState } from "react";

export default function StatePage() {

    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }


    return (
        <div>
            <p> Count: {count} </p>
            <button onClick={increment}>Increment</button>
            <h1>State Page</h1>
        </div>
    )

}