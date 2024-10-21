import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { useContext, useEffect, useState } from 'react';

interface ExperienceEntry {
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

function Experience() {
  const [experienceList, setExperienceList] = useState<ExperienceEntry[]>([]);
  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    return <div>Error: ResumeInfoContext is not provided.</div>;
  }

  const { resumeInfo, setResumeInfo } = resumeContext;

  useEffect(() => {
    if (resumeInfo?.experience) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  useEffect(() => {
    if (experienceList.length > 0) {
      setResumeInfo((prev) => ({
        ...prev,
        experience: experienceList,
        firstName: resumeInfo?.firstName || '',
        lastName: resumeInfo?.lastName || '',
        jobTitle: resumeInfo?.jobTitle || '',
        address: resumeInfo?.address || '',
        phone: resumeInfo?.phone || '',
        email: resumeInfo?.email || '',
        summery: resumeInfo?.summery || '',
        themeColor: resumeInfo?.themeColor || '',
        education: resumeInfo?.education || [],
        skills: resumeInfo?.skills || [],
      }));
    }
  }, [experienceList, setResumeInfo]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedEntries = [...experienceList];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [name]: value,
    };
    setExperienceList(updatedEntries);
  };

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        id: Date.now(), // Generate unique ID
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        workSummery: '',
      },
    ]);
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Professional Experience</h2>
      <p>Add Your previous Job experience</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={item.id} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div>
              <label className='text-xs'>Position Title</label>
              <Input
                name="title"
                onChange={(event) => handleChange(index, event)}
                value={item.title}
              />
            </div>
            <div>
              <label className='text-xs'>Company Name</label>
              <Input
                name="companyName"
                onChange={(event) => handleChange(index, event)}
                value={item.companyName}
              />
            </div>
            <div>
              <label className='text-xs'>City</label>
              <Input
                name="city"
                onChange={(event) => handleChange(index, event)}
                value={item.city}
              />
            </div>
            <div>
              <label className='text-xs'>State</label>
              <Input
                name="state"
                onChange={(event) => handleChange(index, event)}
                value={item.state}
              />
            </div>
            <div>
              <label className='text-xs'>Start Date</label>
              <Input
                type="date"
                name="startDate"
                onChange={(event) => handleChange(index, event)}
                value={item.startDate}
              />
            </div>
            <div>
              <label className='text-xs'>End Date</label>
              <Input
                type="date"
                name="endDate"
                onChange={(event) => handleChange(index, event)}
                value={item.endDate || ''}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end'>
        <button onClick={addNewExperience} className='bg-primary text-white px-5 py-2 rounded-lg'>
          Add More
        </button>
      </div>
    </div>
  );
}

export default Experience;
