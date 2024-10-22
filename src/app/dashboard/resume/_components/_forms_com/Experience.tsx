import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';


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
  const [loading, setLoading] = useState(false);
  const params = useParams();

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
        res_email: resumeInfo?.res_email || '',
        summery: resumeInfo?.summery || '',
        themeColor: resumeInfo?.themeColor || '',
        education: resumeInfo?.education || [],
        skills: resumeInfo?.skills || [],
      }));
    }
    
  }, [experienceList]);

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
        id: Date.now(),
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

  const removeExperience = () => {
    setExperienceList(experienceList => experienceList.slice(0, -1));
  }

  const handleRichTextEditor = (value: string, index: number) => {
    const updatedEntries = [...experienceList];
    updatedEntries[index].workSummery = value;
    setExperienceList(updatedEntries);
  };

  const handleSumbit = async () => {

    setLoading(true);
    try {
      const response = await fetch('/api/resume', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: params.id,
          experience: experienceList,
        }),
      });
      if (response) {
        toast("successfully saved")
        setLoading(false);

      }
    } catch (e: any) {
      console.log(e.message)
      setLoading(false);
    }

  }

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
            <div className='col-span-2'>
              <RichTextEditor
                index={index}
                defaultValue={item?.workSummery}
                onRichTextEditorChange={(value) => handleRichTextEditor(value, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between mt-5'>
        <div className='flex gap-4'>
          <Button
            variant="secondary"
            onClick={addNewExperience}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out"
          >
            + Add More
          </Button>
          <Button
            variant="outline"
            onClick={removeExperience}
            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
          >
            Remove
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={() => handleSumbit()}
          className={`px-6 py-2 rounded-lg ${loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'} transition-all duration-300 ease-in-out`}
        >
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>

    </div>
  );
}

export default Experience;
