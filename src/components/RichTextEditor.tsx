import React, { useContext, useState } from 'react';
import { Button } from './ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from '@/service/AiModal';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { toast } from 'sonner';

interface RichTextEditorProps {
  index: number;
  defaultValue: string;
  onRichTextEditorChange: (value: string) => void;
}

function RichTextEditor({ index, defaultValue, onRichTextEditorChange }: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const resumeContext = useContext(ResumeInfoContext);

  if (!resumeContext) {
    return <div>Error: ResumeInfoContext is not provided.</div>;
  }

  const { resumeInfo } = resumeContext;

  const generateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast("Please enter the position title first")
      return;
    }

    setLoading(true);
    const prompt = `Position title: ${resumeInfo.experience[index].title}. Based on this title, provide 5-7 bullet points for my resume experience (No JSON, in HTML format).`;
    const response = await AIChatSession.sendMessage(prompt);
    const result = await response.response.text();

    const sanitizedValue = result.replace('[', '').replace(']', '');
    setValue(sanitizedValue);
    onRichTextEditorChange(sanitizedValue);
    setLoading(false);
  };

  return (
    <div>
      <EditorProvider>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnBulletList />
          <BtnNumberedList />
          <Separator />
          <BtnLink />
        </Toolbar>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
        />
      </EditorProvider>

      <Button
        disabled={loading}
        variant="secondary"
        onClick={generateSummaryFromAI}
        className="bg-sky-500 mt-3 flex gap-3 justify-center items-center px-4 py-2 rounded-lg hover:bg-sky-600 text-white transition-all duration-300 ease-in-out"
      >
        {loading ? <LoaderCircle className='animate-spin' /> : <Brain />} Generate Summary with AI
      </Button>
    </div>
  );
}

export default RichTextEditor;
