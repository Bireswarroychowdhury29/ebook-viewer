
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Moon, Sun, Minus, Plus } from "lucide-react";

interface ReaderControlsProps {
  onFontSizeChange: (size: number) => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const ReaderControls = ({
  onFontSizeChange,
  onThemeToggle,
  isDarkMode,
}: ReaderControlsProps) => {
  const [fontSize, setFontSize] = useState(100);

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
    onFontSizeChange(value[0]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border transition-all duration-300 animate-fade-in">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Minus className="w-4 h-4" />
          <Slider
            value={[fontSize]}
            onValueChange={handleFontSizeChange}
            min={80}
            max={150}
            step={10}
            className="w-32"
          />
          <Plus className="w-4 h-4" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          className="rounded-full"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
