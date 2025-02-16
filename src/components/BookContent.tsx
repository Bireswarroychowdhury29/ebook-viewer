
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Chapter {
  title: string;
  content: string;
}

const sampleChapters: Chapter[] = [
  {
    title: "Chapter 1: Introduction",
    content: "Welcome to our interactive reading experience. This platform is designed to make reading comfortable and enjoyable across all devices."
  },
  {
    title: "Chapter 2: Getting Started",
    content: "Use the controls at the bottom of the screen to customize your reading experience. You can adjust the text size and toggle between light and dark modes for comfortable reading in any environment."
  },
];

interface BookContentProps {
  fontSize: number;
}

export const BookContent = ({ fontSize }: BookContentProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);

  const nextChapter = () => {
    if (currentChapter < sampleChapters.length - 1) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const previousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-[calc(100vh-80px)]">
      <div 
        className="prose dark:prose-invert mx-auto transition-all duration-300"
        style={{ fontSize: `${fontSize}%` }}
      >
        <h1 className="text-2xl font-serif font-bold mb-6 text-center">
          {sampleChapters[currentChapter].title}
        </h1>
        <p className="font-serif leading-relaxed">
          {sampleChapters[currentChapter].content}
        </p>
      </div>
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={previousChapter}
          disabled={currentChapter === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={nextChapter}
          disabled={currentChapter === sampleChapters.length - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
