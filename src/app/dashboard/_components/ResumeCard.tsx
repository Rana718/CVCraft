import { ResumeInit } from '@/types'
import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ResumeCardProps {
  resume: ResumeInit
  refreshData: () => void
}


function ResumeCard({ resume, refreshData }: ResumeCardProps) {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/resume?id=${resume.unicon_id}`, {
        method: 'DELETE'
      })
      if (res) {
        toast('Resume deleted successfully')
        refreshData();
        setLoading(false);
        console.log(res)
      }
    }
    catch (err) {
      setLoading(false)
      console.log(err)
    }

  }

  return (
    <div>
      <Link href={`/dashboard/resume/${resume.unicon_id}/edit`}>
        <div className='p-14 bg-secondary flex items-center justify-center h-[280px] border border-purple-500 rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-purple-700'>
          <img src="/cv.png" width={80} height={80} />
        </div>
      </Link>
      <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
        style={{
          background: resume?.themeColor
        }}
      >
        <h2 className='text-center my-1'>{resume.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>

            <DropdownMenuItem onClick={() => router.push('/dashboard/resume/' + resume.unicon_id + "/edit")}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/resume/' + resume.unicon_id + "/view")}>View/Download</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete()}
                disabled={loading}>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>


    </div>
  )
}

export default ResumeCard
