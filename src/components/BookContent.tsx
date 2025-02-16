
import { useState, useRef } from 'react';
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
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const pageRef = useRef<HTMLDivElement>(null);

  const nextChapter = () => {
    if (currentChapter < sampleChapters.length - 1 && !isFlipping) {
      setDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentChapter(prev => prev + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const previousChapter = () => {
    if (currentChapter > 0 && !isFlipping) {
      setDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentChapter(prev => prev - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-[calc(100vh-80px)] overflow-hidden">
      <div 
        ref={pageRef}
        className={`prose dark:prose-invert mx-auto transition-all duration-300 relative
          ${isFlipping ? 'animate-page-flip' : ''}
          ${direction === 'next' ? 'origin-left' : 'origin-right'}
        `}
        style={{ 
          fontSize: `${fontSize}%`,
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className={`
          transition-transform duration-300 bg-background
          ${isFlipping && direction === 'next' ? 'rotate-y-90' : ''}
          ${isFlipping && direction === 'prev' ? '-rotate-y-90' : ''}
        `}>
          <h1 className="text-2xl font-serif font-bold mb-6 text-center">
            {sampleChapters[currentChapter].title}
          </h1>
          <p className="font-serif leading-relaxed">
            {sampleChapters[currentChapter].content}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={previousChapter}
          disabled={currentChapter === 0 || isFlipping}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={nextChapter}
          disabled={currentChapter === sampleChapters.length - 1 || isFlipping}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
