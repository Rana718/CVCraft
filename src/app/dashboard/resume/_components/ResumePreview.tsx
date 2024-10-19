import { ResumeInfoContext } from '@/context/ResumeinfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './_preview_com/PersonalDetailPreview'
import SummeryPreview from './_preview_com/SummeryPreview';
import ExperiencePreview from './_preview_com/ExperiencePreview';
import EducationalPreview from './_preview_com/EducationalPreview';
import SkillsPreview from './_preview_com/SkillsPreview';

function ResumePreview() {
  const context = useContext(ResumeInfoContext);
  if(!context){
    return <div>No resume info avaiable</div>
  }
  const {resumeInfo} = context

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{ borderColor: resumeInfo?.themeColor}}>
      <PersonalDetailPreview resumeInfo={resumeInfo}/>
      <SummeryPreview resumeInfo={resumeInfo}/>

      <ExperiencePreview resumeInfo={resumeInfo}/>
      <EducationalPreview resumeInfo={resumeInfo}/>
      <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
