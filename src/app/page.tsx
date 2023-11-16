"use client"

import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies] = useCookies(["user"]);
  const router = useRouter();
  if (cookies.user) {
    router.push('/users');
  }
  else {
    router.push('/login');
  }
  return <></>
}
