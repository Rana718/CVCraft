import { ResumeInfoProps } from '@/types'
import React from 'react'

function EducationalPreview({ resumeInfo }: ResumeInfoProps) {
    if (!resumeInfo || !resumeInfo.education) {
        return <p className='text-sm text-gray-500'>No education details available.</p>;
      }

    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Education</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo.education.length > 0 ? (
                resumeInfo.education.map((education, index) => (
                    <div key={index} className='my-5'>
                        <h2
                            className='text-sm font-bold'
                            style={{
                                color: resumeInfo?.themeColor,
                            }}
                        >
                            {education.universityName}
                        </h2>
                        <h2 className='text-xs flex justify-between'>
                            {education?.degree} in {education?.major}
                            <span>
                                {education?.startDate} - {education?.endDate}
                            </span>
                        </h2>
                        <p className='text-xs my-2'>{education?.description}</p>
                    </div>
                ))
            ) : (
                <p className='text-sm text-gray-500'>No education details available.</p>
            )}

        </div>
    )
}

export default EducationalPreview