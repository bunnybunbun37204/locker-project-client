'use client'

import { useSearchParams } from "next/navigation";
import { serviceValidation } from "../lib/fetcher"
import { useEffect } from "react";
import { useRouter } from "next/router";

const Callback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const ticket = searchParams.get("ticket") || "";
    useEffect(() => {
        const valid = async (search: string) => {
          const result = await serviceValidation(search);
          if (result) {
            console.log(result);
            router.push('/booking_demo');
          }
          
        };
        if (ticket !== "") {
          valid(ticket);
        }
      }, [router, ticket]);
    
    return <h1>Loading...</h1>
}

export default Callback;