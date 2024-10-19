import { ResumeInfoProps } from '@/types'
import React from 'react'

function SummeryPreview({resumeInfo}:ResumeInfoProps) {
  return (
    <p className='text-xs'>
        {resumeInfo?.summery}
    </p>
  )
}

export default SummeryPreview