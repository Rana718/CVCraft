import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, FileX, Home } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import PersonalDetails from './_forms_com/PersonalDetails';
import Summery from './_forms_com/Summery';
import Experience from './_forms_com/Experience';

function FromSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link className='border-2 border-purple-300 rounded-full p-3' href={"/dashboard"}>
            <Home />
          </Link>
          <div className='flex flex-row gap-2 border-2 rounded-full px-3 items-center border-purple-300'>
            <FileX /> <span>Theme</span>
          </div>
        </div>

        <div className='flex gap-2'>
          {activeFormIndex > 1 &&
            <Button size={"lg"} onClick={() => setActiveFormIndex(activeFormIndex - 1)}> <ArrowLeft /> </Button>
          }

          <Button disabled={!enableNext} className='flex gap-1 bg-purple-400 hover:bg-purple-800' size={"lg"} onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
            Next <ArrowRight />
          </Button>

        </div>
      </div>

      {activeFormIndex == 1 ?
        <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
        : activeFormIndex == 2 ?
          <Summery enabledNext={(v) => setEnableNext(v)} />
          : activeFormIndex == 3 ?
            <Experience />  
            : activeFormIndex == 4 ?
              <div> sumery2</div>
              // <Education/>
              : activeFormIndex == 5 ?
                <div> sumery3</div>
                // <Skills/>
                // :activeFormIndex==6?
                // <Navigate to={'/my-resume/'+resumeId+"/view"}/>

                : null
      }

    </div>
  )
}

export default FromSection
