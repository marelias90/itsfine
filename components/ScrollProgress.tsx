
import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 h-32 md:h-48 w-[2px] bg-stone-200 rounded-full overflow-hidden z-50 hidden md:block">
      <div 
        className="w-full bg-stone-400 transition-all duration-300 ease-out rounded-full"
        style={{ 
          height: `${progress * 100}%`,
          opacity: Math.max(0.2, progress) 
        }}
      />
    </div>
  );
};

export default ScrollProgress;
