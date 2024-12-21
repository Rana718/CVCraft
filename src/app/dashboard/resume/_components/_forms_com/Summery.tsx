import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { AIChatSession } from '@/service/AiModal';
import { Brain, LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';


interface SummeryProps {
    enabledNext: (value: boolean) => void;
}

interface AiSummary {
    summary: string;
    experience_level: string;
}

function Summery({ enabledNext }: SummeryProps) {
    const resumeContext = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState<AiSummary[]>([]);

    const { resumeInfo, setResumeInfo } = resumeContext;

    useEffect(() => {
        if (summery && resumeInfo) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery || '',
                firstName: resumeInfo?.firstName || '',
                lastName: resumeInfo?.lastName || '',
                jobTitle: resumeInfo?.jobTitle || '',
                address: resumeInfo?.address || '',
                phone: resumeInfo?.phone || '',
                email: resumeInfo?.email || '',
                res_email: resumeInfo?.res_email || '',
                themeColor: resumeInfo?.themeColor || '',
                experience: resumeInfo?.experience || [],
                education: resumeInfo?.education || [],
                skills: resumeInfo?.skills || [],
            })
        }
    }, [summery, resumeInfo, setResumeInfo])

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        const PROMPT = `Job Title: ${resumeInfo?.jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format`
        const result = await AIChatSession.sendMessage(PROMPT);
        setAiGenerateSummeryList(JSON.parse(result.response.text()));
        setLoading(false);
        console.log(result);
    }


    const onSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/resume', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: params.id,
                    summery: summery
                }),
            });
            if (response) {
                toast("successfully saved")
                setLoading(false);
                enabledNext(true);
                
            }
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
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
                    <Textarea className="mt-5 h-32" required 
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

            {aiGeneratedSummeryList.length > 0 &&
                <div className='my-5'>
                    <h2 className='font-bold text-lg'>Suggestions</h2>
                    {aiGeneratedSummeryList?.map((item, index) => (
                        <div key={index}
                            onClick={() => setSummery(item?.summary)}
                            className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                            <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            }

        </div>
    )
}

export default Summery
