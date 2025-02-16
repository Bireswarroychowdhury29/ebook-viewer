
import { useState } from 'react';
import { ReaderControls } from '@/components/ReaderControls';
import { BookContent } from '@/components/BookContent';

const Index = () => {
  const [fontSize, setFontSize] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${
      isDarkMode ? 'dark' : ''
    }`}>
      <BookContent fontSize={fontSize} />
      <ReaderControls
        onFontSizeChange={setFontSize}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Index;
