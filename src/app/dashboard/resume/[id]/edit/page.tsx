"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FromSection from '../../_components/FromSection';
import ResumePreview from '../../_components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { ResumeData } from '@/types';

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState<ResumeData | null>(null);

  const getResumeInfo = async () => {
    const res = await fetch(`http://localhost:3000/api/resume?id=${params.id}`)
    const data = await res.json()
    setResumeInfo(data)
  }

  useEffect(() => {
    getResumeInfo()
  }, [getResumeInfo])

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>

        <FromSection />

        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
