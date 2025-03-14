
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CollapsibleContentProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleContent = ({ title, children, defaultOpen = false }: CollapsibleContentProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg mb-4">
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center p-4 text-lg font-medium text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </Button>
      {isOpen && (
        <div className="p-4 pt-0 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleContent;
