
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
  image?: string;
}

const sampleChapters: Chapter[] = [
  {
    title: "My Orange Book of Grammar",
    content: "Welcome to our interactive grammar learning experience. This platform is designed to make learning grammar comfortable and enjoyable across all devices.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Chapter 1: Grammar Basics",
    content: "Grammar is the foundation of language. In this chapter, we'll explore the basic building blocks that help us communicate effectively.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Chapter 2: Parts of Speech",
    content: "Understanding parts of speech is crucial for mastering any language. Let's dive into nouns, verbs, adjectives, and more.",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Chapter 3: Sentence Structure",
    content: "A well-structured sentence is like a well-built house. Learn how to construct sentences that are both grammatically correct and effective.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80"
  },
];

interface BookContentProps {
  fontSize: number;
}

export const BookContent = ({ fontSize: initialFontSize }: BookContentProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [fontSize, setFontSize] = useState(initialFontSize);
  const [currentPage, setCurrentPage] = useState(`${currentChapter + 1}`);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const nextChapter = () => {
    if (currentChapter < sampleChapters.length - 1 && !isFlipping) {
      setDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentChapter(prev => prev + 1);
        setCurrentPage(`${currentChapter + 2}`);
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
        setCurrentPage(`${currentChapter}`);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(event.target.value);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= sampleChapters.length) {
      setCurrentPage(event.target.value);
      setCurrentChapter(newPage - 1);
    }
  };

  const handlePageSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const newPage = parseInt(currentPage);
      if (!isNaN(newPage) && newPage >= 1 && newPage <= sampleChapters.length) {
        setCurrentChapter(newPage - 1);
      } else {
        setCurrentPage(`${currentChapter + 1}`);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const zoomIn = () => {
    setFontSize(prev => Math.min(prev + 10, 150));
  };

  const zoomOut = () => {
    setFontSize(prev => Math.max(prev - 10, 80));
  };

  const toggleHighlighter = () => {
    setIsHighlighting(!isHighlighting);
    if (!isHighlighting) {
      document.body.style.cursor = 'text';
      document.addEventListener('mouseup', handleHighlight);
    } else {
      document.body.style.cursor = 'default';
      document.removeEventListener('mouseup', handleHighlight);
    }
  };

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.className = 'bg-yellow-300/50';
      range.surroundContents(span);
      selection.removeAllRanges();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#8B4513]">
      {/* Top Navigation */}
      <div className="bg-[#663300] text-white p-2 flex items-center justify-between border-b border-[#FFA500]">
        <div className="flex items-center gap-2">
          <span className="text-sm">Go to page</span>
          <input 
            type="text" 
            className="w-16 px-2 py-1 text-sm bg-[#8B4513] border border-[#FFA500] rounded"
            value={currentPage}
            onChange={handlePageChange}
            onKeyDown={handlePageSubmit}
          />
          <span className="text-sm">/ {sampleChapters.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#8B4513]">
            <Image className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-[#8B4513]">
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
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-[#8B4513]/50"
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
              <h1 className="text-3xl font-bold mb-6 text-center text-[#FFA500]">
                {sampleChapters[currentChapter].title}
              </h1>
              {sampleChapters[currentChapter].image && (
                <div className="mb-6">
                  <img 
                    src={sampleChapters[currentChapter].image} 
                    alt={sampleChapters[currentChapter].title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
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
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-[#8B4513]/50"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-[#663300] text-white p-2 flex items-center justify-center gap-2 border-t border-[#FFA500]">
        <Button variant="ghost" size="sm" className="text-white hover:bg-[#8B4513]">
          <Home className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-white hover:bg-[#8B4513]">
          <Search className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-[#8B4513]"
          onClick={zoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-[#8B4513]"
          onClick={zoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-[#8B4513]" 
          onClick={toggleFullscreen}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`text-white hover:bg-[#8B4513] ${isHighlighting ? 'bg-[#8B4513]' : ''}`}
          onClick={toggleHighlighter}
        >
          <PenLine className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
