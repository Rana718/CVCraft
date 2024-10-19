import { ResumeInit } from '@/types'
import { Notebook } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ResumeCardProps{
    resume: ResumeInit
}


function ResumeCard({resume}:ResumeCardProps) {
  return (
    <Link href={`/dashboard/resume/${resume.id}/edit`}>
        <div className='p-14 bg-secondary flex items-center justify-center h-[280px] border border-purple-500 rounded-lg hover:scale-105 transition-all hover:shadow-md shadow-purple-700'>
            <Notebook/>
        </div>
        <h2 className='text-center my-1'>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCard
