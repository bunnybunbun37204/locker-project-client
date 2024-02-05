"use client"

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Locker from "../locker/page";

const CallBackBooking = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const router = useRouter();

    const { data, error, isLoading } = useSWR(
      "https://locker-vidya-api.netlify.app/.netlify/functions/api/locker/getData/A",
      fetcher
    );
  
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    if (data) {
        localStorage.setItem('datajaa', JSON.stringify(data.message));
        return <Locker/>
    }
}

export default CallBackBooking;