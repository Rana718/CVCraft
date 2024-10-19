import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'


interface SummeryProps{
    enabledNext: (value: boolean) => void;
}

function Summery({enabledNext}: SummeryProps) {
    const [summery, setSummery] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();
    const resumeContext = useContext(ResumeInfoContext);

    if (!resumeContext) {
        return <div>Error: ResumeInfoContext is not provided.</div>;
    }

    const { resumeInfo, setResumeInfo } = resumeContext;

    useEffect(()=>{
        // summery&&setResumeInfo({
        //     ...resumeInfo,
        //     summery:summery
        // })
        console.log(resumeInfo?.summery)
    },[])

    const GenerateSummeryFromAI=async()=>{
        
    }


    const onSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // try {
        //     const response = await fetch('/api/resume', {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id: params.id,
        //             firstName: formData.firstName,
        //             lastName: formData.lastName,
        //             jobTitle: formData.jobTitle,
        //             address: formData.address,
        //             phone: formData.phone,
        //             res_email: formData.email,
        //         }),
        //     });
        //     if (response) {
        //         enabledNext(true);
        //         setLoading(false);
        //         toast({
        //             title: 'Success',
        //             description: 'Personal Details saved successfully',
        //             variant: 'default',
        //         })
        //     }
        // } catch (error) {
        //     console.error('Error saving personal details:', error);
        //     setLoading(false);
        // }
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summery</h2>
                <p>Add Summery for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summery</label>
                        <Button variant="outline" onClick={() => GenerateSummeryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' />  Generate from AI</Button>
                    </div>
                    <Textarea className="mt-5" required
                        value={summery}
                        defaultValue={summery ? summery : resumeInfo?.summery}
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit"
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Summery
