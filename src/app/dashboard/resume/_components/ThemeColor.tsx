import { colors } from '@/constant';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { useParams } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';

function ThemeColor() {
    const [selectedColor, setSelectedColor] = useState('');
    const params = useParams();
    const resumeContext = useContext(ResumeInfoContext);

    if (!resumeContext) {
        return <div>Error: ResumeInfoContext is not provided.</div>;
    }
    const { resumeInfo, setResumeInfo } = resumeContext;

    const onColorSelect = async (color: string) => {
        setSelectedColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color,
            firstName: resumeInfo?.firstName || '',
            lastName: resumeInfo?.lastName || '',
            jobTitle: resumeInfo?.jobTitle || '',
            address: resumeInfo?.address || '',
            phone: resumeInfo?.phone || '',
            email: resumeInfo?.email || '',
            res_email: resumeInfo?.res_email || '',
            summery: resumeInfo?.summery || '',
            education: resumeInfo?.education || [],
            experience: resumeInfo?.experience || [],
            skills: resumeInfo?.skills || [],
        });

        try {
            const response = await fetch('/api/resume', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: params.id,
                    themeColor: color,
                }),
            });

            if (response.ok) {
                toast("Theme color successfully saved!", { duration: 3000 });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex text-xl gap-2 px-4 py-6 rounded-full text-white bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        <LayoutGrid className="w-5 h-5" />
                        <span className="font-semibold">Select Theme</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 border border-gray-300 rounded-lg shadow-lg">
                    <h2 className="mb-4 text-sm font-bold text-gray-700">Select Theme Color</h2>
                    <div className="grid grid-cols-5 gap-3">
                        {colors.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => onColorSelect(item)}
                                className={`h-10 w-10 rounded-full cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md border ${
                                    selectedColor === item ? 'border-4 border-black' : 'border-gray-300'
                                }`}
                                style={{
                                    backgroundColor: item,
                                }}
                            />
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default ThemeColor;
