'use client'

import { useParams } from "next/navigation";
import useSWRMutation from "swr/mutation";

const User = () => {
    async function sendRequest(url : string, { arg }: { arg: string}) {
        console.log("ARG ",arg);
        
        return fetch(url, {
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          body: JSON.stringify({id : arg})
        }).then(res => res.json())
      }
    const {data,isMutating,error, trigger } = useSWRMutation('http://localhost:8000/getUserById', sendRequest, /* options */)

    const params = useParams();
    console.log(params.user);
    trigger(params.user.toString());

    return (
        <>
        {error && <h1>Error...</h1>}
        {!data && <h1>Loading....</h1>}
        {data &&  <h1>Hello {data.username}</h1>}
        </>
    );
};

export default User;