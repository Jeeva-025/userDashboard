"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import useUserStore from "../store.js"; 
import Authenticate from "../components/Authenticate"; 

const AppPage = () => {
  const user = useUserStore((state) => state.user); 
  const router = useRouter();

  useEffect(() => {
    
    if (user) {
      router.push("/pages"); 
    }
  }, [user, router]);



  return (
    <>
      {/* If userEmail is not set, show the Authenticate component */}
      {!user && <Authenticate />}
    </>
  );
};

export default AppPage;
