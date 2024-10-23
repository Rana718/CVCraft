import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import PersonalDetails from './_forms_com/PersonalDetails';
import Summery from './_forms_com/Summery';
import Experience from './_forms_com/Experience';
import Education from './_forms_com/Education';
import Skills from './_forms_com/Skills';
import { useRouter } from 'next/navigation';
import ThemeColor from './ThemeColor';

function FromSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (activeFormIndex === 6) {
      router.push(`/resume/${id}/view`);
    }
  }, [activeFormIndex, id, router]);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link
            className='border-2 border-purple-300 rounded-full p-3 bg-purple-100 text-purple-600 shadow-lg hover:bg-purple-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 active:bg-purple-600'
            href="/dashboard"
          >
            <Home />
          </Link>
          <ThemeColor />
        </div>


        <div className='flex gap-2'>
          {activeFormIndex > 1 && (
            <Button size={"lg"} onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}

          <Button
            disabled={!enableNext}
            className='flex gap-1 bg-purple-400 hover:bg-purple-800'
            size={"lg"}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 ? (
        <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience />
      ) : activeFormIndex === 4 ? (
        <Education />
      ) : activeFormIndex === 5 ? (
        <Skills />
      ) : null}
    </div>
  );
}

export default FromSection;
