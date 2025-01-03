import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface PersonalDetailsProps {
    enabledNext: (value: boolean) => void;
}

function PersonalDetails({ enabledNext }: PersonalDetailsProps) {
    const params = useParams();
    const resumeContext = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        jobTitle: '',
    });
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = resumeContext || {};

    
    useEffect(() => {
        if (resumeInfo) {
            setFormData({
                firstName: resumeInfo.firstName || '',
                lastName: resumeInfo.lastName || '',
                email: resumeInfo.email || '',
                phone: resumeInfo.phone || '',
                address: resumeInfo.address || '',
                jobTitle: resumeInfo.jobTitle || '',
            });
        }
    }, [resumeInfo]);

    
    useEffect(() => {
        if (resumeInfo && setResumeInfo) {
            setResumeInfo({
                ...resumeInfo,
                ...formData
            });
        }
    }, [formData, resumeInfo, setResumeInfo]);

    if (!resumeContext) {
        return <div>Error: ResumeInfoContext is not provided.</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        enabledNext(false);
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        
        setResumeInfo?.((prev) => prev ? ({
            ...prev,
            [name]: value
        }) : null);
    };

    const onSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/resume', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: params.id,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    jobTitle: formData.jobTitle,
                    address: formData.address,
                    phone: formData.phone,
                    res_email: formData.email,
                }),
            });
            if (response) {
                enabledNext(true);
                setLoading(false);
                toast("Successfully saved personal details")
            }
        } catch (error) {
            console.error('Error saving personal details:', error);
            setLoading(false);
        }
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Detail</h2>
            <p>Get Started with the basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input
                            name="firstName"
                            defaultValue={formData.firstName}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input
                            name="lastName"
                            required
                            onChange={handleInputChange}
                            defaultValue={formData.lastName}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input
                            name="jobTitle"
                            required
                            defaultValue={formData.jobTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input
                            name="address"
                            required
                            defaultValue={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input
                            name="phone"
                            required
                            defaultValue={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input
                            name="email"
                            required
                            defaultValue={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default PersonalDetails;
