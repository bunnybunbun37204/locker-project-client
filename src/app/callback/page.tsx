'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { serviceValidation } from "../lib/fetcher"
import { useEffect } from "react";
import Loading from "../loading/page";

const Callback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const ticket = searchParams.get("ticket") || "";
    useEffect(() => {
        const valid = async (search: string) => {
          const result = await serviceValidation(search);
          if (result) {
            router.push('/booking_demo');
          }
          
        };
        if (ticket !== "") {
          valid(ticket);
        }
      }, [router, ticket]);
    
    return <Loading/>
}

export default Callback;