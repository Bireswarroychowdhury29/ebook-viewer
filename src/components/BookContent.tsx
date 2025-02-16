
import { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Home,
  Search,
  PenLine,
  Image,
  VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Chapter {
  title: string;
  content: string;
}

const sampleChapters: Chapter[] = [
  {
    title: "My Blue Book of Grammar",
    content: "Welcome to our interactive grammar learning experience. This platform is designed to make learning grammar comfortable and enjoyable across all devices."
  },
  {
    title: "Chapter 1: Grammar Basics",
    content: "Grammar is the foundation of language. In this chapter, we'll explore the basic building blocks that help us communicate effectively."
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#003366]">
      {/* Top Navigation */}
      <div className="bg-[#002347] text-white p-2 flex items-center justify-between border-b border-blue-800">
        <div className="flex items-center gap-2">
          <span className="text-sm">Go to page</span>
          <input 
            type="text" 
            className="w-16 px-2 py-1 text-sm bg-blue-900 border border-blue-700 rounded"
            value={`${currentChapter + 1} / ${sampleChapters.length}`}
            readOnly
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
            <Image className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
            <VolumeX className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        <Button
          variant="ghost"
          onClick={previousChapter}
          disabled={currentChapter === 0 || isFlipping}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-blue-800/50"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div 
            ref={pageRef}
            className={`prose prose-invert mx-auto transition-all duration-300 relative
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
              transition-transform duration-300
              ${isFlipping && direction === 'next' ? 'rotate-y-90' : ''}
              ${isFlipping && direction === 'prev' ? '-rotate-y-90' : ''}
            `}>
              <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
                {sampleChapters[currentChapter].title}
              </h1>
              <p className="leading-relaxed text-white">
                {sampleChapters[currentChapter].content}
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={nextChapter}
          disabled={currentChapter === sampleChapters.length - 1 || isFlipping}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-blue-800/50"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-[#002347] text-white p-2 flex items-center justify-center gap-2 border-t border-blue-800">
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
          <Home className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800" onClick={toggleFullscreen}>
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-800">
          <PenLine className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
