"use client"
import React, { useEffect, useState } from 'react'
import AddResume from './_components/AddResume'
import { useUser } from '@clerk/nextjs';
import ResumeCard from './_components/ResumeCard';

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const { user } = useUser();

    useEffect(() => {
        getResumeData();
    }, [user])


    const getResumeData = async () => {
        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) return;

        try {
            const response = await fetch(`/api/resume?email=${email}`);
            const data = await response.json();

            if (response.ok) {
                setResumes(data);
            } else {
                console.log("Error:", data.message);
            }
        } catch (error) {
            console.log("Error fetching resumes:", error);
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-32'>
        <h2 className='font-bold text-3xl'>My Resume</h2>
        <p>Start Creating Your Resume using AI</p>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5 gap-3'>
          <AddResume/>

          {resumes.length > 0 && resumes.map((item, index)=>(
            <ResumeCard key={index} resume={item} refreshData={getResumeData}/>
          ))}
        </div>
    </div>
  )
}

export default Dashboard
