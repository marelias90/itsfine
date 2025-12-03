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
      className={`transition-all duration-[1400ms] ease-soft will-change-[opacity,transform] ${
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