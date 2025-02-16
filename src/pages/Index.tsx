
import { useState } from 'react';
import { BookContent } from '@/components/BookContent';

const Index = () => {
  const [fontSize, setFontSize] = useState(100);

  return (
    <div className="h-screen bg-[#003366] text-white">
      <BookContent fontSize={fontSize} />
    </div>
  );
};

export default Index;
