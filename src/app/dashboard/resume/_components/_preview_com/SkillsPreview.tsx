import { ResumeInfoProps } from '@/types';
import React from 'react';

function SkillsPreview({ resumeInfo }: ResumeInfoProps) {
    if (!resumeInfo || !resumeInfo.skills) {
        return <p className='text-sm text-gray-500'>No Skills available.</p>;
    }

    return (
        <div className="my-6">
            <h2
                className="text-center font-bold text-sm mb-2"
                style={{
                    color: resumeInfo?.themeColor,
                }}
            >
                Skills
            </h2>
            <hr
                style={{
                    borderColor: resumeInfo?.themeColor,
                }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                {resumeInfo.skills.length > 0 &&
                    resumeInfo.skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <h2 className="text-xs sm:text-sm font-medium">{skill.name}</h2>
                            <div className="relative h-2 bg-gray-200 w-full max-w-[140px] rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        backgroundColor: resumeInfo?.themeColor,
                                        width: skill?.rating + '%',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default SkillsPreview;
