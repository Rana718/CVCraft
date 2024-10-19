import { ResumeData } from "@/types";
import { createContext, Dispatch, SetStateAction } from "react";


interface ResumeInfoContextType{
    resumeInfo: ResumeData | null;
    setResumeInfo: Dispatch<SetStateAction<ResumeData | null>>;
}


export const ResumeInfoContext = createContext<ResumeInfoContextType | null>(null)