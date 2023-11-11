'use client'

import { useParams } from "next/navigation";

const User = () => {
    const params = useParams();
    console.log(params);
    
    return (
        <h1>
            Hello {params.user}
        </h1>
    );
};

export default User;