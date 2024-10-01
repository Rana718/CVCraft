"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={()=>router.replace("/dashboard")}>Go to Dashboard</Button>
    </div>
  );
}
