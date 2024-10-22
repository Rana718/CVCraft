"use client";
import ResumePreview from '@/app/dashboard/resume/_components/ResumePreview';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { ResumeData } from '@/types';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { RWebShare } from 'react-web-share';
//@ts-expect-error
import html2pdf from 'html2pdf.js';

function ViewResume() {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState<ResumeData | null>(null);

    useEffect(() => {
        GetResumeInfo();
    }, []);

    const GetResumeInfo = async () => {
        const res = await fetch(`http://localhost:3000/api/resume?id=${params.id}`);
        const data = await res.json();
        setResumeInfo(data);
    };

    const HandleDownload = () => {
        const printArea = document.getElementById("print-area");
        if (printArea) {
            const options = {
                margin: 0.1,
                filename: `${resumeInfo?.firstName}_${resumeInfo?.lastName}_Resume.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            };
            html2pdf().from(printArea).set(options).save();
        }
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print" className="my-10 mx-10 md:mx-20 lg:mx-36">
                <h2 className="text-center text-3xl font-semibold animate-fade-in-up">
                    🎉 Congrats! Your AI-Generated Resume is Ready! 🎉
                </h2>
                <p className="text-center text-gray-500 mt-4 animate-fade-in-up">
                    You can now download your resume or share the unique URL with your friends and family!
                </p>
                
                <div className="flex justify-between items-center mt-10 px-10 md:px-44 gap-5">
                    
                    <Link href="/dashboard" passHref>
                        <Button className="border-2 border-purple-500 bg-purple-100 text-purple-600 px-5 py-3 rounded-full shadow-lg hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95">
                            Home
                        </Button>
                    </Link>

                    
                    <Button 
                        onClick={HandleDownload}
                        className="border-2 border-green-500 bg-green-100 text-green-600 px-5 py-3 rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95">
                        Download
                    </Button>

                    
                    <RWebShare
                        data={{
                            text: "Hello Everyone, This is my resume! Check it out:",
                            url: window.location.href,
                            title: `${resumeInfo?.firstName} ${resumeInfo?.lastName}'s Resume`,
                        }}
                        onClick={() => console.log("Shared successfully!")}
                    >
                        <Button 
                            className="border-2 border-blue-500 bg-blue-100 text-blue-600 px-5 py-3 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110 active:scale-95">
                            Share
                        </Button>
                    </RWebShare>
                </div>
            </div>

            
            <div className="my-10 mx-10 md:mx-20 lg:mx-36 animate-fade-in-up">
                <div id="print-area" className="">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
