import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import '@smastrom/react-rating/style.css';
import { toast } from 'sonner';



interface Skill {
  id: number,
  name: string,
  rating: number,
}

function Skills() {
  const params = useParams();
  const resumeContext = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = resumeContext;

  useEffect(() => {
    if (resumeInfo) {
      setResumeInfo({
        ...resumeInfo,
        skills: skillsList,
      });
    }
  }, [skillsList, resumeInfo, setResumeInfo]);

  useEffect(() => {
    if (resumeInfo?.skills) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  const handleChange = (index: number, name: keyof Skill, value: string | number) => {
    const newEntries = [...skillsList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: value,
    };
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([...skillsList, {
      id: Date.now(),
      name: '',
      rating: 0
    }])
  }

  const RemoveSkills = () => {
    setSkillsList(skillsList => skillsList.slice(0, -1))
  }

  const onSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/resume', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: params.id,
          skills: skillsList,
        }),
      });
      if (response) {
        toast("successfully saved")
        setLoading(false);

      }
    } catch (e) {
      console.log(e)
      setLoading(false);
    }
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList && skillsList.map((item, index) => (
          <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
            <div>
              <label className='text-xs'>Name</label>
              <Input className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)} />
            </div>
            <Rating style={{ maxWidth: 120 }} value={item.rating / 20}
              onChange={(v: number) => handleChange(index, 'rating', v * 20)} />

          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewSkills} className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out">
            + Add More
          </Button>

          <Button variant="outline" onClick={RemoveSkills} className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out">
            Remove
          </Button>

        </div>
        <Button
          disabled={loading}
          onClick={() => onSave()}
          className={`px-6 py-2 rounded-lg ${loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'} transition-all duration-300 ease-in-out`}
        >
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Skills
