'use client'

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react"; // Import useEffect
import Loading from "../loading/page";

const CallBackBooking = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedZone = searchParams.get("selectedZone") || "A";
  const selectedDate = searchParams.get("selectedDate");

  const { data, error, isLoading } = useSWR(
    `https://locker-vidya-api.netlify.app/.netlify/functions/api/locker/getData/${selectedZone}`,
    fetcher
  );

  useEffect(() => {
    if (error) {
      console.error("Failed to load data:", error);
      // Handle the error state if needed
    }

    if (data) {
      localStorage.setItem('datajaa', JSON.stringify(data.message));
      router.push(`/locker?selectedDate=${selectedDate}&selectedZone=${selectedZone}`);
    }
  }, [data, error, router, selectedDate, selectedZone]);

  if (isLoading) return <Loading />;
  return null; // Render nothing or a loading indicator while waiting for the effect to run
};

export default CallBackBooking;