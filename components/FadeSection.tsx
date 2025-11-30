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
  threshold = 0.1
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
      // Trigger a bit earlier so it feels like it's waiting for you
      rootMargin: '0px 0px -50px 0px' 
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
      // using a custom cubic bezier for a very gentle "settling" effect
      className={`transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-8 blur-sm'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeSection;