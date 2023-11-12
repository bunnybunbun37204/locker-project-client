'use client'

import { useParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const User = () => {
    async function fetcher(url : string) {
        console.log(url);
        
        return fetch(url).then(res => res.json())
    }
    const params = useParams();
    const { data, error, mutate } = useSWR(
      params.user ? `http://localhost:8000/getUser/${params.user}` : null,
      fetcher // Assume you have a fetcher function defined elsewhere
    );
  
    useEffect(() => {
      if (params.user) {
        // Trigger the fetch when the user ID changes
        mutate();
      }
    }, [params.user, mutate]);
  
    return (
      <>
        {error && <h1>Error...</h1>}
        {!data && <h1>Loading....</h1>}
        {data && <h1>Hello {data.username}</h1>}
      </>
    );
  };
  
  export default User;
  