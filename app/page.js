"use client"; // Mark this file as a Client Component

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <Image 
          src="/What-is-a-Mock-Interview.jpg.webp" 
          alt="Welcome Image" 
          width={500} 
          height={300} 
          priority 
          className="mx-auto rounded-lg shadow-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 mt-8">Welcome to AI-MOCK-INTERVIEWER</h1>
        <p className="text-gray-600 mt-4">Click the button below to go to the dashboard</p>
        <Button className="mt-6" onClick={handleGoToDashboard}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
