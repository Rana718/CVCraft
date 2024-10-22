import { ResumeData } from '@/types';

export const updateResumeInfo = (setResumeInfo: React.Dispatch<React.SetStateAction<ResumeData | null>>, resumeInfo: ResumeData | null, updates: Partial<ResumeData>) => {
    setResumeInfo({
        ...resumeInfo,
        ...updates,
        firstName: resumeInfo?.firstName || '',
        lastName: resumeInfo?.lastName || '',
        jobTitle: resumeInfo?.jobTitle || '',
        address: resumeInfo?.address || '',
        phone: resumeInfo?.phone || '',
        email: resumeInfo?.email || '',
        res_email: resumeInfo?.res_email || '',
        summery: resumeInfo?.summery || '',
        themeColor: resumeInfo?.themeColor || '',
        experience: resumeInfo?.experience || [],
        education: resumeInfo?.education || [],
        skills: resumeInfo?.skills || [],
    });
};
