"use client"

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Locker from "../locker/page";
import Loading from "../loading/page";

const CallBackBooking = () => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const searchParams = useSearchParams();
    const selectedZone = searchParams.get("selectedZone") || "A";
    const selectedDate = searchParams.get("selectedDate");

    const { data, error, isLoading } = useSWR(
      `https://locker-vidya-api.netlify.app/.netlify/functions/api/locker/getData/${selectedZone}`,
      fetcher
    );
  
    if (error) return <div>failed to load</div>;
    if (isLoading) return <Loading/>
    if (data) {
        localStorage.setItem('datajaa', JSON.stringify(data.message));
        return <Locker/>
    }
}

export default CallBackBooking;