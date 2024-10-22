import { ResumeInit } from '@/types';
import { Loader2Icon, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ResumeCardProps {
  resume: ResumeInit;
  refreshData: () => void;
}

function ResumeCard({ resume, refreshData }: ResumeCardProps) {
  const router = useRouter();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/resume?id=${resume.unicon_id}`, {
        method: 'DELETE',
      });
      if (res) {
        toast('Resume deleted successfully');
        refreshData();
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className='group relative p-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl'>

      <Link href={`/dashboard/resume/${resume.unicon_id}/edit`} passHref>
        <div className='relative p-14 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center h-[200px] border-2 border-purple-500 rounded-t-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3'>
          <img
            src='/cv.png'
            alt='Resume Icon'
            className='w-[80px] h-[80px] transition-transform duration-300 ease-in-out transform group-hover:rotate-12 group-hover:scale-125'
          />

          <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
        </div>
      </Link>


      <div
        className='border-t p-4 flex justify-between items-center text-white rounded-b-lg shadow-lg transition-colors duration-300 ease-in-out'
        style={{
          background: resume?.themeColor || '#4A5568',
        }}
      >

        <h2 className='text-center font-bold text-lg group-hover:text-purple-200 transition-colors'>
          {resume.title}
        </h2>


        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-6 w-6 cursor-pointer hover:text-purple-400 transition-transform duration-300 ease-in-out transform hover:rotate-90' />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-gray-900 text-white p-2 rounded-md shadow-lg transition-opacity duration-300 ease-in-out'>
            <DropdownMenuItem
              className='hover:bg-purple-500 transition-colors duration-200 ease-in-out rounded-md px-4 py-2'
              onClick={() =>
                router.push(`/dashboard/resume/${resume.unicon_id}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='hover:bg-purple-500 transition-colors duration-200 ease-in-out rounded-md px-4 py-2'
              onClick={() => router.push(`/resume/${resume.unicon_id}/view`)}
            >
              View/Download
            </DropdownMenuItem>
            <DropdownMenuItem
              className='hover:bg-red-600 transition-colors duration-200 ease-in-out rounded-md px-4 py-2'
              onClick={() => setOpenAlert(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <AlertDialog open={openAlert}>
          <AlertDialogContent className='bg-gray-800 text-white p-6 rounded-md shadow-lg'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-red-500'>
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className='text-gray-400'>
                This action cannot be undone. This will permanently delete your resume
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className='bg-gray-600 px-4 py-2 rounded-md text-gray-300 hover:bg-gray-500 transition-all duration-200'
                onClick={() => setOpenAlert(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className='bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-500 transition-all duration-200 flex items-center gap-2'
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? (
                  <Loader2Icon className='animate-spin' />
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCard;
