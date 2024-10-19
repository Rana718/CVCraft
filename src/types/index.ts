export interface ResumeInit {
    id: string;
    unicon_id: string;
    title: string;
    user: string;
    email: string;
}
export interface ResumeData {
    firstName: string;
    lastName: string;
    jobTitle: string;
    address: string;
    phone: string;
    email: string;
    themeColor: string;
    summery: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
}

export interface ResumeInfoProps {
    resumeInfo: ResumeData | null;
}



interface Experience {
    id: number;
    title: string;
    companyName: string;
    city: string;
    state: string;
    startDate: string;
    endDate?: string;
    currentlyWorking: boolean;
    workSummery: string;
}

interface Education {
    id: number;
    universityName: string;
    startDate: string;
    endDate: string;
    degree: string;
    major: string;
    description: string;
}

interface Skill {
    id: number;
    name: string;
    rating: number;
}
