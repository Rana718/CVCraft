import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { v4 as uuidv4 } from 'uuid';
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { Loader2Icon, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useUser } from "@clerk/nextjs";


function AddResume() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState("");
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    

    const handleCreateResume = async () => {
        setIsLoading(true);
        const id = uuidv4();
        const user_name = user?.fullName;
        const email = user?.primaryEmailAddress?.emailAddress;
        console.log(user)

        try {
            const response = await fetch("/api/resume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    user: user_name,
                    email: email
                }),
            });
            if (response) {
                setIsLoading(false);
                router.push(`/dashboard/resume/${id}/edit`);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    }

    return (
        <div>
            <div
                className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed'
                onClick={() => setIsDialogOpen(true)}
            >
                <PlusSquare />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for new Resume</p>
                            <Input className="my-2" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />
                        </DialogDescription>

                        <div className="flex justify-end gap-4">
                            <Button variant={"ghost"} onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={() => handleCreateResume()} disabled={!title || isLoading}>
                                {isLoading ? <Loader2Icon className="animate-spin" /> : "Create"}
                            </Button>
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>
            
        </div>
    )
}

export default AddResume
