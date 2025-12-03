import React, { useRef, useEffect, useState } from 'react';

interface SinkingFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

const SinkingFade: React.FC<SinkingFadeProps> = ({ 
  children, 
  delay = 0, 
  className = '',
  threshold = 0.2
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { 
      threshold: threshold,
      rootMargin: '0px 0px -10% 0px'
    });

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[3000ms] ease-decay will-change-[opacity,transform,filter] ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 -translate-y-[40px] blur-[5px]'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default SinkingFade;