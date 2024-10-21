import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';


interface Education {
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
}

function Education() {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [educationalList, setEducationalList] = useState<Education[]>([]);
    const resumeContext = useContext(ResumeInfoContext);

    if (!resumeContext) {
        return <div>Error: ResumeInfoContext is not provided.</div>;
    }
    const { resumeInfo, setResumeInfo } = resumeContext;

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList,
            firstName: resumeInfo?.firstName || '',
            lastName: resumeInfo?.lastName || '',
            jobTitle: resumeInfo?.jobTitle || '',
            address: resumeInfo?.address || '',
            phone: resumeInfo?.phone || '',
            email: resumeInfo?.email || '',
            summery: resumeInfo?.summery || '',
            themeColor: resumeInfo?.themeColor || '',
            experience: resumeInfo?.experience || [],
            skills: resumeInfo?.skills || [],
        })
    }, [educationalList])

    useEffect(() => {
        resumeInfo && setEducationalList(resumeInfo?.education)
    }, [])

    const handleChange = (index: number, event: any) => {
        const { name, value } = event.target;
        const updatedEntries = [...educationalList];
        updatedEntries[index] = {
            ...updatedEntries[index],
            [name]: value,
        };
        setEducationalList(updatedEntries);
    };

    const AddNewEducation = () => {
        setEducationalList([...educationalList,
        {
            id: Date.now(),
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
        ])
    }

    const RemoveEducation = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1))

    }

    const onSave = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/resume', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: params.id,
                    education: educationalList,
                }),
            });
            if (response) {
                toast("successfully saved")
                setLoading(false);

            }
        } catch (e: any) {
            console.log(e.message)
            setLoading(false);
        }
    }



    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your educational details</p>

            <div>
                {educationalList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input name="universityName"
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.universityName}
                                />
                            </div>
                            <div>
                                <label>Degree</label>
                                <Input name="degree"
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.degree} />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input name="major"
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.major} />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input type="date" name="startDate"
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.startDate} />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input type="date" name="endDate"
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.endDate} />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea name="description"
                                    onChange={(e) => handleChange(index, e)}
                                    defaultValue={item?.description} />
                            </div>

                        </div>

                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewEducation} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out">
                        + Add More
                    </Button>
                    <Button variant="outline" onClick={RemoveEducation} className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out">
                        Remove
                    </Button>

                </div>
                <Button
                    disabled={loading}
                    onClick={() => onSave()}
                    className={`px-6 py-2 rounded-lg ${loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'} transition-all duration-300 ease-in-out`}
                >
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Education
