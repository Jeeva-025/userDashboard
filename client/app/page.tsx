"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // For client-side navigation
import useUserStore from "../store.js"; // Assuming the Zustand store is set up here
import Authenticate from "../components/Authenticate"; // Authenticate component

const AppPage = () => {
  const userEmail = useUserStore((state) => state.userEmail); // Zustand selector
  const router = useRouter();

  useEffect(() => {
    // Check userEmail from Zustand and redirect if it's set
    if (userEmail) {
      router.push("/pages"); // Redirect to the user management page
    }
  }, [userEmail, router]);



  return (
    <>
      {/* If userEmail is not set, show the Authenticate component */}
      {!userEmail && <Authenticate />}
    </>
  );
};

export default AppPage;
