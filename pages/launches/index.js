import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Launches() {
  const router= useRouter();

  useEffect(()=>{
    router.push("/");
  })

  return null;
}

