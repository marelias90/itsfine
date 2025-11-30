import React, { useRef, useEffect, useState } from 'react';

interface FadeSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  // allow triggering earlier or later
  threshold?: number; 
}

const FadeSection: React.FC<FadeSectionProps> = ({ 
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
      rootMargin: '0px 0px -10% 0px' // Wait until element is a bit further up
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
      // Increased duration to 2000ms and added blur transition
      // cubic-bezier(0.2, 0.8, 0.2, 1) is a very soft "ease-out"
      className={`transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-[opacity,transform] ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-12 blur-md'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeSection;